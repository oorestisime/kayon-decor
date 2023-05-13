import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

export const FAQ = ({
  data,
}: {
  data: { question: string; answer: string }[];
}) => {
  return (
    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
      {data.map((data) => (
        <Disclosure as="div" key={data.question} className="pt-6">
          {({ open }) => (
            <>
              <dt>
                <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                  <span className="text-base font-semibold leading-7">
                    {data.question}
                  </span>
                  <span className="ml-6 flex h-7 items-center">
                    {open ? (
                      <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </dt>
              <Disclosure.Panel as="dd" className="mt-2 pr-12">
                <p className="text-base leading-7 text-gray-600">
                  {data.answer}
                </p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </dl>
  );
};
