import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

import faqs from "../../data/faq.json";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="gradient-title flex flex-col items-center justify-center text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter px-4">
          Publicação de Monografias{" "}
          <span className="flex items-center gap-2 sm:gap-6">
            dos Estudantes do{" "}
            <img
              src="/logo.png"
              alt="IFMA logo"
              className="h-14 sm:h-24 lg:h-32"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore as monografias de TCC e trabalhos científicos dos estudantes
          do IFMA Campus Timon
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        <Link to="/monografias">
          <Button variant={"blue"} size={"xl"}>
            Ver Monografias
          </Button>
        </Link>
        <Link to="/submeter-monografia">
          <Button variant={"destructive"} size={"xl"}>
            Submeter Monografia
          </Button>
        </Link>
      </div>

      {/* Accordion*/}

      <Accordion type="single" collapsible>
        {faqs.map(({ question, answer }, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export { LandingPage };
