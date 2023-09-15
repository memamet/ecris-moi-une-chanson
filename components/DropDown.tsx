import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type VibeType =
    | 'La beauté et la tranquillité de la nature.'
    | 'La douleur et la résilience face à la perte.'
    | "La joie et l'innocence retrouvées de l'enfance."
    | "La complexité des relations amoureuses à l'ère numérique."
    | "Le voyage intérieur vers l'acceptation de soi."
    | "La quête incessante de liberté face à l'oppression."
    | 'La célébration de la diversité culturelle et la fusion des mondes.'
    | "La transition de l'adolescence à l'âge adulte, avec ses défis et découvertes."
    | "La mélodie nostalgique des souvenirs d'été."
    | "L'exploration des regrets et des 'et si' dans nos choix de vie."
    | 'La gratitude pour les petites choses du quotidien.'
    | 'La confrontation entre la réalité moderne et les traditions anciennes.'
    | "La merveille de la découverte lors d'un premier amour."
    | "La force trouvée dans la solidarité et l'unité communautaire."
    | "L'émerveillement face à l'immensité de l'univers."
    | "La recherche d'un but ou d'une signification dans un monde chaotique.";

interface DropDownProps {
    vibe: VibeType;
    setVibe: (vibe: VibeType) => void;
}

let vibes: VibeType[] = [
    'La beauté et la tranquillité de la nature.',
    'La douleur et la résilience face à la perte.',
    "La joie et l'innocence retrouvées de l'enfance.",
    "La complexité des relations amoureuses à l'ère numérique.",
    "Le voyage intérieur vers l'acceptation de soi.",
    "La quête incessante de liberté face à l'oppression.",
    'La célébration de la diversité culturelle et la fusion des mondes.',
    "La transition de l'adolescence à l'âge adulte, avec ses défis et découvertes.",
    "La mélodie nostalgique des souvenirs d'été.",
    "L'exploration des regrets et des 'et si' dans nos choix de vie.",
    'La gratitude pour les petites choses du quotidien.',
    'La confrontation entre la réalité moderne et les traditions anciennes.',
    "La merveille de la découverte lors d'un premier amour.",
    "La force trouvée dans la solidarité et l'unité communautaire.",
    "L'émerveillement face à l'immensité de l'univers.",
    "La recherche d'un but ou d'une signification dans un monde chaotique.",
];

export default function DropDown({ vibe, setVibe }: DropDownProps) {
  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
          {vibe}
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          key={vibe}
        >
          <div className="">
            {vibes.map((vibeItem) => (
              <Menu.Item key={vibeItem}>
                {({ active }) => (
                  <button
                    onClick={() => setVibe(vibeItem)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      vibe === vibeItem ? "bg-gray-200" : "",
                      "px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between"
                    )}
                  >
                    <span>{vibeItem}</span>
                    {vibe === vibeItem ? (
                      <CheckIcon className="w-4 h-4 text-bold" />
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
