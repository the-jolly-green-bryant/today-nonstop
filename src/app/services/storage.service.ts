import { Injectable } from "@angular/core"
import { Storage } from "@ionic/storage-angular"

@Injectable({
  providedIn: "root",
})
export class StorageService {
  public readonly event_stream_db_key = "dialog_event_stream"
  public readonly preferences_db_key = "game_preferences"
  public readonly story_summary_db_key = "story_summary"
  private readonly database_ready: Promise<Storage>

  constructor(private storage: Storage) {
    this.database_ready = this.storage.create()
  }

  /**
   * Sets the value at a given key in our database.
   *
   * @param {string} key   The database key we want to set
   * @param {any}    value The value we want to set for the key
   */
  public async set<T>(key: string, value: T): Promise<void> {
    const database = await this.database_ready
    await database.set(key, value)
  }

  /**
   * Gets a key value from our database. If the database is not available, wait
   * until it is.
   *
   * @param {string} key The database key we want to query
   */
  public async get<T>(key: string): Promise<T | null> {
    const database = await this.database_ready
    return await database.get(key)
  }

  /**
   * Removes a single value without disturbing preferences or unrelated data.
   */
  public async remove(key: string): Promise<void> {
    const database = await this.database_ready
    await database.remove(key)
  }

  /**
   * Clears everything in our database.
   */
  public async clear() {
    const database = await this.database_ready
    await database.clear()
  }
}
