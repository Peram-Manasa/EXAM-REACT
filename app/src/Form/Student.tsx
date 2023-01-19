import * as yup from "yup";
import { FormProvider, SubmitHandler } from "react-hook-form";
import { PrimaryButton } from "@fluentui/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import Dynamic from "../SharedComponents/Dynamic";
import { STUDENT_DETAILS } from "./helper";
import "./form.scss";
const Student = () => {
  interface StudentData {
    name?: string;
    RollNumber?: number;
    English?: number;
    Telugu?: number;
    Hindi?: number;
    Science?: number;
    Social?: number;
    Activities?: number;
    TotalMarks?: number;
  }
  //Schema validation
  const StudentSchema: yup.SchemaOf<StudentData> = yup.object().shape({
    name: yup.string().required(),
    RollNumber: yup.number(),
    English: yup.number().max(100),
    Telugu: yup.number().max(100),
    Hindi: yup.number().max(100),
    Science: yup.number().max(100),
    Social: yup.number().max(100),
    Activities: yup.number().max(100),
    TotalMarks: yup.number().max(100),
  });

  //usinf useform

  const StudentFormMethod = useForm<any>({
    mode: "all",
    resolver: async (data, context, options) => {
      return yupResolver(StudentSchema)(data, context, options);
    },
  });

  const [submit, setSubmit] = useState();

  const navigation = useNavigate();

  const id = useParams();
  const StudentFormSubmit: SubmitHandler<any> = (data: any) => {
    setSubmit(data);
    if (id.id) {
      editF(data);
    } else {
      createF(data);
    }
    StudentFormMethod.reset({});
    navigation("/View");
  };
  const getAdditionalProps = (item: any) => {
    item.control = StudentFormMethod.control;
    item.setValue = StudentFormMethod.setValue;
    item.register = StudentFormMethod.register;
    return item;
  };

  const [data, setData] = useState<any>();
  const getStudentData = async () => {
    try {
      const r = await axios.get(`http://localhost:5000/data/${id.id}`);
      setData(r.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editF = async (updateData: any) => {
    try {
      const r = await axios.put(
        `http://localhost:5000/data/${id.id}`,
        updateData
      );
      setData(r.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createF = async (updateData: any) => {
    const generateN: any = Math.random();
    const newData = { ...updateData, id: generateN };
    try {
      const r = await axios.post(`http://localhost:5000/data`, newData);
      setData(r.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudentData();
  }, [id]);

  useEffect(() => {
    data &&
      Object.entries(data).forEach(([key, value]: any) => {
        StudentFormMethod.setValue(key, value, {
          shouldValidate: true,
        });
      });
  }, [data]);

  console.log(StudentFormMethod.watch(), StudentFormMethod.formState.errors);

  return (
    <>
      <div className="Header_one">
        <img src="https://zelarsoft.com/wp-content/uploads/2021/10/logo.png" />
      </div>

      <div className="form">
        <div className="form_h1">
          <h4>Student </h4>&nbsp;
          <p>Details</p>
        </div>
        <div>
          <hr />
        </div>
        <FormProvider {...StudentFormMethod}>
          <form onSubmit={StudentFormMethod.handleSubmit(StudentFormSubmit)}>
            <div className="form_container">
              {STUDENT_DETAILS?.map((rows: any) => {
                return (
                  <div className="form_containerone">
                    <div className={`rowOne ${rows.className}`}></div>
                    {rows.controls?.map((item: any) => {
                      const updatedI = getAdditionalProps(item);
                      return Dynamic(item.type, updatedI);
                    })}
                  </div>
                );
              })}
            </div>
            
            <div className="form_footer">
            <div><hr/></div>
              <PrimaryButton
              style={{borderRadius:"10px"}}
                type="submit"
                onClick={StudentFormMethod.handleSubmit(StudentFormSubmit)}
              >
                Submit
              </PrimaryButton>
            </div>
          
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default Student;
