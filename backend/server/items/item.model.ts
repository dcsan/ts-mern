import { Document, model, Schema } from "mongoose"
import { IItem } from "../../../types"
import { SchemaDef } from "../../types"

// Declare model interface
interface ItemDoc extends IItem, Document { }

const itemSchemaDef: SchemaDef<IItem> = {
  cname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: false,
  },
}

// Define model schema
const itemSchema = new Schema(itemSchemaDef)

export default model<ItemDoc>("Item", itemSchema)
