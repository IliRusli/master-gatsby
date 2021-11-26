import { MdStore as icon } from "react-icons/md";
import PriceInput from "../components/PriceInput";

export default {
  // computer name
  name: "pizza",
  // visible name
  title: "Pizzas",
  type: "document",
  icon,
  fields: [
    {
      name: "name",
      title: "Pizza Name",
      type: "string",
      description: "Name of the pizza",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 100,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      inputComponent: PriceInput,
      description: "Price of the pizza in cents",
      validation: (Rule) => Rule.min(1000),
      // TODO add custom input component
    },
    {
      name: "toppings",
      title: "Toppings",
      type: "array",
      of: [{ type: "reference", to: [{ type: "topping" }] }],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      topping0: "toppings.0.name",
      topping1: "toppings.1.name",
      topping2: "toppings.2.name",
      topping3: "toppings.4.name",
    },
    prepare: ({ title, media, ...toppings }) => {
      const tops = Object.values(toppings).filter(Boolean);
      return { title, media, subtitle: Object.values(tops).join(", ") };
    },
  },
};
