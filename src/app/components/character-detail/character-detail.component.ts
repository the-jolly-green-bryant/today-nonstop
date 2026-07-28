import { Component, Input } from "@angular/core"
import { DialogStream } from "../../classes/dialog-stream"
import dialog_data from "../../game-data/dialog.json"

interface CharacterMemory {
  key: string
  description: string
  minimum_quantity: number
  unlocked: boolean
}

@Component({
  standalone: false,
  selector: "app-character-detail",
  templateUrl: "./character-detail.component.html",
  styleUrls: ["./character-detail.component.scss"],
})
export class CharacterDetailComponent {
  @Input() identifier: string = null
  @Input() stream: DialogStream = null

  public game_data: any = dialog_data

  get character() {
    return this.game_data.characters[this.identifier]
  }

  has_item_in_quantity(item_key: string, quantity: number) {
    return (
      this.stream?.inventory?.some(
        (item) =>
          item.identifier === item_key && item.quantity >= (quantity || 1),
      ) ?? false
    )
  }

  get memories(): CharacterMemory[] {
    return Object.entries(this.character?.discoverables ?? {}).map(
      ([key, value]: [string, any]) => ({
        key,
        description: value.description,
        minimum_quantity: value.minimum_quantity ?? 1,
        unlocked: this.has_item_in_quantity(key, value.minimum_quantity ?? 1),
      }),
    )
  }

  get recovered_memories(): number {
    return this.memories.filter((memory) => memory.unlocked).length
  }

  get memory_progress(): number {
    return this.memories.length
      ? Math.round((this.recovered_memories / this.memories.length) * 100)
      : 0
  }

  memory_image(memory: CharacterMemory): string {
    return (
      this.game_data.items[memory.key]?.avatar || this.character?.avatar || ""
    )
  }

  track_memory(_: number, memory: CharacterMemory): string {
    return memory.key
  }
}
