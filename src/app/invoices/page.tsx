import { Button } from "@/components/ui/button";
import InvoiceList from "@/features/invoices/InvoiceList";

const page = () => {
  return (
    <div>
      <div className="my-5 flex mx-auto max-w-screen-md justify-between items-center">
        <h2 className="">Invoices</h2>
        <Button className="default">+</Button>
      </div>
      <InvoiceList />
    </div>
  );
};

export default page;
