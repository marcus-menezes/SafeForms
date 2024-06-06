"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormStatus, IForm, IManegeForm } from "@safe-forms/shared/models/form";
import { FormSchema } from "@/schemes/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { City, Country, ICity, IState, State } from "country-state-city";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Card } from "./ui/card";
import { Combobox } from "./ui/combo-box";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  data?: IForm;
  edit?: boolean;
  onSubmit: () => void;
}

const ModalForm = ({ data, edit = false, onSubmit }: IProps) => {
  const form = useForm<IManegeForm>({
    resolver: zodResolver(FormSchema),
    values: edit ? data : undefined,
  });
  const { handleSubmit, control } = form;

  const [States, setStates] = useState<IState[]>([]);
  const [Cities, setCities] = useState<ICity[]>([]);

  const Countries = Country.getAllCountries();

  const selectedCountry = useWatch({
    control,
    name: "country",
  });

  const selectedState = useWatch({
    control,
    name: "state",
  });

  useEffect(() => {
    if (selectedCountry) {
      const States = State.getStatesOfCountry(selectedCountry);
      setStates(States);
    }
    if (selectedCountry && selectedState) {
      const Cities = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(Cities);
    }
  }, [selectedCountry, selectedState]);

  const onSubmitForm = (submitData: IManegeForm) => {
    const isComplete = Object.values(submitData).every(
      (value) => value !== undefined && value !== ""
    );
    if (isComplete) {
      // Enviar os dados para o backend
      console.log("Enviando para o backend:", submitData);
      // Chame sua função de API aqui
    } else {
      const draftForm: IForm = {
        ...submitData,
        id: uuidv4(),
        status: FormStatus.DRAFT,
        createdAt: new Date().toISOString(),
      };
      const hasDraftForm = localStorage.getItem("draftForm");
      if (edit && hasDraftForm) {
        const draftForms = JSON.parse(hasDraftForm);
        const index = draftForms.findIndex(
          (form: IForm) => form.id === data?.id
        );
        draftForms.splice(index, 1, draftForm);
        localStorage.setItem("draftForm", JSON.stringify(draftForms));
      } else {
        if (hasDraftForm) {
          localStorage.setItem(
            "draftForm",
            JSON.stringify([...JSON.parse(hasDraftForm), draftForm])
          );
        } else {
          localStorage.setItem("draftForm", JSON.stringify([draftForm]));
        }
      }
    }
    onSubmit();
  };

  return (
    <Dialog onOpenChange={(open) => open && form.reset()}>
      <DialogTrigger>
        {edit ? (
          <Button>Edit</Button>
        ) : (
          <Card className="flex items-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Create New Form
          </Card>
        )}
      </DialogTrigger>
      <DialogContent className="bg-card overflow-y-scroll h-[700px] max-w-2xl">
        <DialogHeader>
          <DialogTitle>{edit ? "Edit Form" : "Create New Form"}</DialogTitle>
          <DialogDescription>
            {edit
              ? "Fill out the form below to edit a form."
              : "Fill out the form below to create a new form."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <div>
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Date of Birth"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="CPF" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        datas={Countries.map((c) => ({
                          value: c.isoCode,
                          label: c.name,
                        }))}
                        placeholder="Select Country"
                        label="Country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        datas={States?.map((c) => ({
                          value: c.isoCode,
                          label: c.name,
                        }))}
                        placeholder="Select State"
                        label="State"
                        disabled={!selectedCountry}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        datas={Cities?.map((c) => ({
                          value: c.name,
                          label: c.name,
                        }))}
                        placeholder="Select City"
                        label="City"
                        disabled={!selectedState}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={control}
                name="files"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Files</FormLabel>
                    <FormControl>
                      <Input type="file" multiple {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type="submit" className="w-full">
                  Create Form
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalForm;
