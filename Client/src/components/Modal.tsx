import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { Objective } from "../schemas/objective";
import { useObjectives } from "../services/objectives";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type Props = {
  setModalOpen: Function;
  isModalOpen: boolean;
  targetSectionId: string;
};

function Modal({ ...props }: Props) {
  const { register, handleSubmit } = useForm<Objective>();
  const dialog = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();
  const { create } = useObjectives();
  const navigator = useNavigate();
  const crateMutation = useMutation(create);

  useEffect(() => {
    if (props.isModalOpen) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [dialog, props.isModalOpen]);

  const onSubmit = async (newObjective: Objective) => {
    newObjective.status = "To Do";
    newObjective.sectionId = props.targetSectionId;

      crateMutation.mutate(newObjective, {
      onSuccess: () => {
        props.setModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["objectives"] });
      },
    });
  };

  const handleCancel = () => {
    props.setModalOpen(false);
    //unde merge?
    navigator("/Objectives");
  };

  return (
    <dialog ref={dialog} className="backdrop:backdrop-blur-sm ">
      <form className="flex flex-col bg-gray-300 gap-4 p-8">
        <label>Adaugare obiectiv: </label>
        <label>
          Title:
          <input type="text" {...register("name")} />
        </label>
        <label>
          Description:
          <input type="text" {...register("description")} />
        </label>
        <div className="flex flex-row gap-x-8">
          <button onClick={handleSubmit(onSubmit)}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </dialog>
  );
}

export default Modal;
