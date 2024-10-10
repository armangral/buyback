import { useState } from "react";
import Stepper from "src/features/newProduct/components/Stepper";
import StepperControl from "src/features/newProduct/components/StepperControl";
import { UseContextProvider } from "src/features/newProduct/contexts/StepperContext";
import Product from "src/features/newProduct/components/steps/Product";
import Media from "src/features/newProduct/components/steps/Media";
import Pricing from "src/features/newProduct/components/steps/Pricing";
import Card from "src/component/card";

const AddProduct = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { stepNo: 1, name: "Product Info" },
    { stepNo: 2, name: "Media" },
    { stepNo: 3, name: "Pricing" },
  ];

  const displayStep = (step) => {
    switch (step.stepNo) {
      case 1:
        return <Product />;
      case 2:
        return <Media />;
      case 3:
        return <Pricing />;
      default:
        return null;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // Ensure the steps stay within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="mt-3 h-full w-full">
      <div className="h-[350px] w-full rounded-[20px] bg-gradient-to-br from-brand-400 to-brand-600 md:h-[390px]" />
      <div className="w-md:2/3 mx-auto h-full w-5/6 md:px-3  3xl:w-7/12">
        <div className="-mt-[280px] w-full pb-10 md:-mt-[240px] md:px-[70px]">
          <Stepper
            action={setCurrentStep}
            steps={steps}
            currentStep={currentStep}
          />
        </div>
        <Card extra={"h-full mx-auto pb-3"}>
          <div className="rounded-[20px]">
            <UseContextProvider>
              {displayStep(steps[currentStep - 1])}
            </UseContextProvider>
          </div>
          {/* navigation button */}
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
