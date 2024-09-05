import { Hotel, ReservationForm } from "@/models/hotel";
import { useForm } from "react-hook-form";
import TextField from "../shared/TextField";
import Text from "../shared/Text";
import { Fragment, useCallback } from "react";
import Select from "../shared/Select";
import FixedBottomButton from "../shared/FixedBottomButton";
import Spacing from "../shared/Spacing";

type FormData = {
  [key: string]: string;
};

function Form({
  forms,
  onSubmit,
  buttonLabel,
}: {
  forms: Hotel["forms"];
  onSubmit: (formValues: FormData) => void;
  buttonLabel: string;
}) {
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: "onBlur",
  });

  const component = useCallback(
    (form: ReservationForm) => {
      if (form.type === "TEXT_FIELD") {
        return (
          <TextField
            label={form.label}
            helpMessage={
              (formState.errors[form.id]?.message as string) || form.helpMessage
            }
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
            hasError={formState.errors[form.id] != null}
          />
        );
      } else if (form.type === "SELECT") {
        return (
          <Select
            label={form.label}
            options={form.options}
            {...register(form.id, {
              required: form.required,
            })}
            // hasError={!!formState.error[form.id]} // select 인자로 추가 필요함
          />
        );
      } else {
        return null;
      }
    },
    [register, formState.errors]
  );

  return (
    <div style={{ padding: 24 }}>
      <Text bold>예약정보</Text>
      <form>
        {forms.map((form) => (
          <Fragment key={form.id}>
            <Spacing size={20} />
            {component(form)}
          </Fragment>
        ))}
      </form>

      <Spacing size={80} />
      <FixedBottomButton label={buttonLabel} onClick={handleSubmit(onSubmit)} />
    </div>
  );
}

const VALIDATION_MESSAGE_MAP: {
  [key: string]: {
    value: RegExp;
    message: string;
  };
} = {
  name: {
    value: /^[가-힣]+$/,
    message: "한글명을 확인해주세요",
  },
  email: {
    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: "이메일 형식을 확인해주세요",
  },
  phone: {
    value: /^\d+$/,
    message: "휴대전화번호를 확인해주세요",
  },
};

export default Form;
