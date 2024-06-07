"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { useCreateForm } from "@/hooks/useCreateForm";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useUpdateForm } from "@/hooks/useUpdateForm";
import { FormSchema } from "@/schemes/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IForm, IManegeForm } from "@safe-forms/shared/models";
import { City, Country, ICity, IState, State } from "country-state-city";
import { Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { ControllerRenderProps, useForm, useWatch } from "react-hook-form";
import InputMask from "react-input-mask";
import { Card } from "./ui/card";
import { Combobox } from "./ui/combo-box";
import { DatePicker } from "./ui/date-picker";

interface IProps {
  data?: IForm;
  edit?: boolean;
  onSubmit: (data?: IForm) => void;
}

const ModalForm = ({ data, edit = false, onSubmit }: IProps) => {
  const form = useForm<IManegeForm>({
    resolver: zodResolver(FormSchema),
    values: edit ? data : undefined,
  });

  const [showModal, setShowModal] = useState(false);
  const { handleSubmit, control } = form;

  const { mutate: createForm } = useCreateForm();
  const { mutate: updateForm } = useUpdateForm();

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

  const { onSubmitForm } = useFormSubmission({
    edit,
    data,
    onSubmit: (id) => {
      onSubmit(id);
      setShowModal(false);
    },
    createForm,
    updateForm,
  });

  const CpfInput = (field: ControllerRenderProps<IManegeForm, "cpf">) => (
    <InputMask
      mask="999.999.999-99"
      value={field.value}
      onChange={field.onChange}
    >
      {/* @ts-ignore */}
      {() => <Input type="text" placeholder="CPF" />}
    </InputMask>
  );

  return (
    <Dialog
      open={showModal}
      onOpenChange={(open) => {
        open && form.reset();
        setShowModal(open);
      }}
    >
      <DialogTrigger>
        {edit ? (
          <Button size="icon">
            <Pencil className="text-secondary" />
          </Button>
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
                      <DatePicker {...field} />
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
                      <CpfInput {...field} />
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
            <DialogFooter>
              <Button type="submit" className="w-full">
                {edit ? "Edit Form" : "Create Form"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalForm;
