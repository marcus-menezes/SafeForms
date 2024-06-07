import { useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { FormStatus, IManegeForm, IForm } from "@safe-forms/shared/models";

interface UseFormSubmissionProps {
  edit?: boolean;
  data?: IForm;
  onSubmit: (data?: IForm) => void;
  createForm: (
    data: Omit<IForm, "id" | "status" | "createdAt">,
    options: any
  ) => void;
  updateForm: (data: { formId: string; data: IForm }, options: any) => void;
}

export const useFormSubmission = ({
  edit,
  data,
  onSubmit,
  createForm,
  updateForm,
}: UseFormSubmissionProps) => {
  const { toast } = useToast();

  const saveDraftForm = useCallback(
    (submitData: IManegeForm) => {
      const draftForm: IForm = {
        ...submitData,
        id: uuidv4(),
        status: FormStatus.DRAFT,
        createdAt: new Date().toISOString(),
      };
      const hasDraftForm = localStorage.getItem("draftForm");
      let draftForms = hasDraftForm ? JSON.parse(hasDraftForm) : [];

      if (edit && hasDraftForm) {
        const index = draftForms.findIndex(
          (form: IForm) => form.id === data?.id
        );
        if (index >= 0) {
          draftForms[index] = draftForm;
        } else {
          draftForms.push(draftForm);
        }
      } else {
        draftForms.push(draftForm);
      }

      localStorage.setItem("draftForm", JSON.stringify(draftForms));
      handleSuccessAlert();
      onSubmit();
    },
    [data, edit, onSubmit]
  );

  const handleSuccess = useCallback(() => {
    if (edit && data?.status === FormStatus.DRAFT) {
      onSubmit(data);
    } else {
      onSubmit();
    }
    handleSuccessAlert();
  }, [data, edit, onSubmit]);

  const handleError = useCallback(() => {
    toast({
      variant: "error",
      title: "Error creating form!",
      description: "Something went wrong. Please try again.",
    });
  }, [toast]);

  const handleSuccessAlert = useCallback(() => {
    toast({
      variant: "default",
      title: edit ? "Form updated!" : "Form created!",
      description: edit
        ? "Form updated successfully."
        : "Form created successfully.",
    });
  }, [toast]);

  const onSubmitForm = useCallback(
    (submitData: IManegeForm) => {
      const isComplete = Object.values(submitData).every(
        (value) => value !== undefined && value !== ""
      );

      if (isComplete) {
        const { status, createdAt, id, ...rest } = submitData;

        if (edit && data?.status === FormStatus.PUBLISHED) {
          updateForm(
            { formId: data.id, data: submitData },
            {
              onSuccess: handleSuccess,
              onError: handleError,
            }
          );
        } else {
          createForm(rest, {
            onSuccess: handleSuccess,
            onError: handleError,
          });
        }
      } else {
        saveDraftForm(submitData);
      }
    },
    [
      createForm,
      data,
      edit,
      handleError,
      handleSuccess,
      saveDraftForm,
      updateForm,
    ]
  );

  return {
    onSubmitForm,
  };
};
