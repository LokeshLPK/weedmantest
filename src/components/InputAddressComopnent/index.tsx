import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type InputAddressComponentProps={
     placeholder: string;
    buttonText: string;
}

export default function InputAddressComponent(props: InputAddressComponentProps) {
    const {placeholder,buttonText}=props;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col relative flex-1">
        

        <div className="flex flex-col sm:flex-row">
          <Input
            type="text"
            placeholder={placeholder}
            className="w-full pl-10 rounded-r-none bg-white-50"
          />
          <Button type="submit">
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
