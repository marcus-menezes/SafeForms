"use client";

import ModalForm from "@/components/modal-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { format, parseISO } from "date-fns";
import { FileBarChart2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormStatus, IForm } from "@safe-forms/shared/models/form";

const HomePage: React.FC = () => {
  const [localForms, setLocalForms] = useState<IForm[]>([]);

  const onSubmitModal = () => {
    getLocalForms();
  };

  const getLocalForms = () => {
    const localForms: IForm[] = JSON.parse(
      localStorage.getItem("draftForm") || "[]"
    );
    setLocalForms(localForms);
  };

  useEffect(() => {
    getLocalForms();
  }, []);

  const renderEmpty = () => (
    <div className="flex items-center justify-center">
      <Card className="flex flex-col w-3/12 items-center justify-center text-center">
        <CardHeader>
          <CardTitle>No forms found!</CardTitle>
          <CardDescription>To get started, create a new form.</CardDescription>
        </CardHeader>
        <CardFooter>
          <ModalForm onSubmit={onSubmitModal} />
        </CardFooter>
      </Card>
    </div>
  );

  const delelteForm = (data: IForm) => {
    const newForms = localForms.filter((form) => form.id !== data.id);
    setLocalForms(newForms);
    localStorage.setItem("draftForm", JSON.stringify(newForms));
  };

  if (localForms.length === 0) return renderEmpty();

  return (
    <div className="container py-8">
      <ModalForm onSubmit={onSubmitModal} />
      {localForms.map((form, index) => (
        <Card key={index} className="flex my-10 px-10 flex-row justify-between">
          <div className="flex flex-row gap-10">
            <FileBarChart2 size={30} className="text-foreground self-center" />
            <div className="flex flex-col py-5 justify-center w-[300px]">
              <p className="text-sm font-semibold tracking-tight text-primary opacity-50">
                Name
              </p>
              <p className="text-2xl font-semibold tracking-tight line-clamp-1">
                {form.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col py-5 justify-center">
            <p className="text-sm font-semibold tracking-tight text-primary opacity-50">
              Status
            </p>
            <Badge
              className="mt-1"
              variant={
                form.status === FormStatus.PUBLISHED ? "success" : "warning"
              }
            >
              {form.status}
            </Badge>
          </div>
          <div className="flex flex-col py-5 justify-center">
            <p className="text-sm font-semibold tracking-tight text-primary opacity-50">
              Created At
            </p>
            <p className="text-xl font-medium tracking-tight">
              {format(parseISO(form.createdAt), "dd/MM/yyyy HH:mm")}
            </p>
          </div>
          <div className="flex flex-row gap-5 py-6 justify-center">
            <ModalForm edit data={form} onSubmit={onSubmitModal} />
            <Popover>
              <PopoverTrigger>
                <Button variant="destructive" size="icon">
                  <Trash2 className="text-secondary" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <h1>Tem certeza que deseja deletar?</h1>

                <PopoverClose className="grid w-full mt-4 grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => delelteForm(form)}>
                    Sim
                  </Button>

                  <Button>Não</Button>
                </PopoverClose>
              </PopoverContent>
            </Popover>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HomePage;
