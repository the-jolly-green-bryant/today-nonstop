import { Injectable } from "@angular/core"
import { Storage } from "@ionic/storage-angular"

@Injectable({
  providedIn: "root",
})
export class StorageService {
  public event_stream_db_key = "dialog_event_stream"
  private database: Storage | null = null

  constructor(private storage: Storage) {
    this.init()
  }

  /**
   * Initializes our database.
   */
  async init() {
    const storage = await this.storage.create()
    this.database = storage
  }

  /**
   * Sets the value at a given key in our database.
   *
   * @param {string} key   The database key we want to set
   * @param {any}    value The value we want to set for the key
   */
  public async set(key: string, value: any) {
    await this.database.set(key, value)
  }

  /**
   * Gets a key value from our database. If the database is not available, wait
   * until it is.
   *
   * @param {string} key The database key we want to query
   */
  public async get(key: string) {
    while (!this.database) {
      await this.delay(10)
    }

    return await this.database.get(key)
  }

  /**
   * Clears everything in our database.
   */
  public async clear() {
    while (!this.database) {
      await this.delay(10)
    }

    await this.database.clear()
  }

  /**
   * Delays for the given number of milliseconds before resolving.
   *
   * @param {number} milliseconds The amount of time to wait.
   */
  delay(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }
}
