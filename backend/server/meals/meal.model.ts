import { Document, model, Schema } from "mongoose"
import { SchemaDef } from "../../types"

// Declare model interface
interface MealDoc extends App.Meal, Document { }

const itemSchemaDef: SchemaDef<App.Meal> = {
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
