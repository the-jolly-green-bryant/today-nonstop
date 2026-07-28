#!/usr/bin/env python3
"""Complete the latest Google Play closed-testing draft and update its listing."""

import json
import os
import sys

from google.auth.transport.requests import AuthorizedSession
from google.oauth2 import service_account


PACKAGE_NAME = os.environ["PLAY_PACKAGE_NAME"]
TRACK = os.environ.get("PLAY_TRACK", "alpha")
RELEASE_NAME = os.environ["PLAY_RELEASE_NAME"]
RELEASE_NOTES = os.environ["PLAY_RELEASE_NOTES"][:500]
LISTING_LANGUAGE = os.environ.get("PLAY_LISTING_LANGUAGE", "en-US")
LISTING_TITLE = os.environ["PLAY_LISTING_TITLE"][:30]
LISTING_SHORT_DESCRIPTION = os.environ["PLAY_LISTING_SHORT_DESCRIPTION"][:80]
LISTING_FULL_DESCRIPTION = os.environ["PLAY_LISTING_FULL_DESCRIPTION"][:4000]
LISTING_ICON_PATH = os.environ["PLAY_LISTING_ICON_PATH"]
APP_BUNDLE_PATH = os.environ["PLAY_APP_BUNDLE_PATH"]
BASE_URL = "https://androidpublisher.googleapis.com/androidpublisher/v3/applications"
UPLOAD_BASE_URL = "https://androidpublisher.googleapis.com/upload/androidpublisher/v3/applications"


def request(session, method, url, **kwargs):
    response = session.request(method, url, timeout=60, **kwargs)
    if not response.ok:
        print(response.text, file=sys.stderr)
        response.raise_for_status()
    return response.json() if response.content else {}


def main():
    credentials_info = json.loads(os.environ["GOOGLE_PLAY_SERVICE_ACCOUNT_JSON"])
    credentials = service_account.Credentials.from_service_account_info(
        credentials_info,
        scopes=["https://www.googleapis.com/auth/androidpublisher"],
    )
    session = AuthorizedSession(credentials)
    edits_url = f"{BASE_URL}/{PACKAGE_NAME}/edits"
    edit_id = request(session, "POST", edits_url, json={})["id"]
    edit_url = f"{edits_url}/{edit_id}"

    try:
        bundle_path = os.path.abspath(APP_BUNDLE_PATH)
        if not os.path.isfile(bundle_path):
            raise FileNotFoundError(f"Android App Bundle not found: {bundle_path}")
        bundle_url = (
            f"{UPLOAD_BASE_URL}/{PACKAGE_NAME}/edits/{edit_id}/bundles"
            "?uploadType=media"
        )
        with open(bundle_path, "rb") as bundle_file:
            bundle = request(
                session,
                "POST",
                bundle_url,
                data=bundle_file,
                headers={"Content-Type": "application/octet-stream"},
            )
        version_codes = [str(bundle["versionCode"])]

        listing_url = f"{edit_url}/listings/{LISTING_LANGUAGE}"
        request(
            session,
            "PUT",
            listing_url,
            json={
                "language": LISTING_LANGUAGE,
                "title": LISTING_TITLE,
                "shortDescription": LISTING_SHORT_DESCRIPTION,
                "fullDescription": LISTING_FULL_DESCRIPTION,
            },
        )

        icon_path = os.path.abspath(LISTING_ICON_PATH)
        if not os.path.isfile(icon_path):
            raise FileNotFoundError(f"Google Play icon not found: {icon_path}")
        request(session, "DELETE", f"{listing_url}/icon")
        upload_url = (
            f"{UPLOAD_BASE_URL}/{PACKAGE_NAME}/edits/{edit_id}/listings/"
            f"{LISTING_LANGUAGE}/icon?uploadType=media"
        )
        with open(icon_path, "rb") as icon_file:
            request(
                session,
                "POST",
                upload_url,
                data=icon_file,
                headers={"Content-Type": "image/png"},
            )

        track_url = f"{edit_url}/tracks/{TRACK}"
        request(
            session,
            "PUT",
            track_url,
            json={
                "track": TRACK,
                "releases": [
                    {
                        "name": RELEASE_NAME,
                        "versionCodes": version_codes,
                        "status": "completed",
                        "releaseNotes": [
                            {"language": LISTING_LANGUAGE, "text": RELEASE_NOTES}
                        ],
                    }
                ],
            },
        )
        request(session, "POST", f"{edit_url}:commit", json={})
        print(
            json.dumps(
                {
                    "packageName": PACKAGE_NAME,
                    "track": TRACK,
                    "status": "completed",
                    "versionCodes": version_codes,
                    "listingTitle": LISTING_TITLE,
                    "listingIconUpdated": True,
                }
            )
        )
    except Exception:
        session.delete(edit_url, timeout=60)
        raise


if __name__ == "__main__":
    main()
