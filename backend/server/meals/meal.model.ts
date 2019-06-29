import { Document, model, Schema } from "mongoose"
import { IMeal } from "../../../types"
import { SchemaDef } from "../../types" // from mongoose package

// Declare model interface
interface MealDoc extends IMeal, Document { }

const mealSchemaDef: SchemaDef<IMeal> = {
  cname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  vegetarian: {
    type: Boolean,
    required: true,
  },
  items: {
    required: false,
    type: Array
  }
}

// Define model schema
const mealSchema = new Schema(mealSchemaDef)

export default model<MealDoc>("Meal", mealSchema)
