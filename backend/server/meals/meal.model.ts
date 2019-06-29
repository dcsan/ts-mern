import { Document, model, Schema } from "mongoose"
import { IMeal } from "../../../types"
import { SchemaDef } from "../../types" // from mongoose package

// Declare model interface
interface MealDoc extends IMeal, Document { }

const itemSchemaDef: SchemaDef<IMeal> = {
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}

// Define model schema
const itemSchema = new Schema(itemSchemaDef)

export default model<MealDoc>("Meal", itemSchema)
