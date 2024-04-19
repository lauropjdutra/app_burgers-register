import Carne from "./assets/carne.jpg"
import Frango from "./assets/frango.jpg"
import Vegano from "./assets/vegano.jpg"
import Fritas from "./assets/fries.jpg"
import Nuggets from "./assets/nuggets.jpg"
import Rings from "./assets/onion-rings.jpg"
import Suco from "./assets/suco.jpg"
import CocaCola from "./assets/coca.jpg"
import Guarana from "./assets/guarana.jpg"

const items = [
  {
    burger: {
      frango: {
        price: 9.99,
        img: Frango,
        name: "Frango",
        desc: "Hambúrguer de frango",
      },
      carne: {
        price: 12.99,
        img: Carne,
        name: "Carne",
        desc: "Hambúrguer de carne",
      },
      vegano: {
        price: 14.99,
        img: Vegano,
        name: "Vegano",
        desc: "Hambúrguer vegano",
      }
    },
  },
  {
    followUp: {
      fritas: {
        price: 4.99,
        img: Fritas,
        name: "Fritas",
        desc: "Porção de batata frita",
      },
      nuggets: {
        price: 7.99,
        img: Nuggets,
        name: "Nuggets",
        desc: "Porção de nuggets",
      },
      anéis: {
        price: 10.99,
        img: Rings,
        name: "Anéis",
        desc: "Porção de anéis de cebola",
      }
    },
  },
  {
    drink: {
      suco: {
        price: 2.99,
        img: Suco,
        name: "Suco",
        desc: "Suco de laranja",
      },
      coca: {
        price: 5.99,
        img: CocaCola,
        name: "Coca",
        desc: "Coca-Cola",
      },
      guaraná: {
        price: 5.99,
        img: Guarana,
        name: "Guaraná",
        desc: "Guaraná Antarctica",
      }
    },
  },
]

export default items