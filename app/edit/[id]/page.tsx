"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import ElevateButton from "@/components/ui/elevatebutton";

const schema = z.object({
  userid: z.string().min(2),
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(1000),
  point: z.enum(["10", "25", "50"]), // Menggunakan nilai string
});

type FormValues = z.infer<typeof schema>;

export default function page({ params }: any) {
  const router = useRouter();
  const [lesson, setLesson] = useState<any>({});
  const id = params.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: FormValues) => {
    ;
    const url = "http://localhost:8080/api/lessons/" + id;
    const pointInt = parseInt(data.point);

    try {
      await axios.put(url, { ...data, point: pointInt });
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
    router.push("/");
  };

  useEffect(() => {
    const url = "http://localhost:8080/api/lessons/single/" + id;
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setLesson(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen max-w-2xl min-h-screen max-h-max px-10 py-7 bg-black text-neutral-200">
      <Navbar />

      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="text-white mt-20 flex flex-col items-start justify-center"
      >
        <input
          className="opacity-0"
          {...register("userid")}
          value={lesson?.userid}
        />
        <div className="mb-4 w-full">
          <label
            htmlFor="name"
            className="block text-white text-xl font-semibold"
          >
            Step 1
          </label>
          <label htmlFor="name" className="block text-neutral-500 text-sm mb-3">
            Tell us what have you learned
          </label>
          <input
            type="text"
            id="name"
            placeholder={lesson?.name}
            {...register("name")}
            className="mt-1 p-2 w-full rounded-lg bg-neutral-900"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="message"
            className="block text-white text-xl font-semibold"
          >
            Step 2
          </label>
          <label
            htmlFor="message"
            className="block text-neutral-500 text-sm mb-3"
          >
            Summarize it
          </label>
          <textarea
            id="message"
            placeholder={lesson?.description}
            {...register("description")}
            className="mt-1 p-2 w-full bg-neutral-900 rounded-md"
          ></textarea>
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-white text-xl font-semibold">
            Step 3
          </label>
          <label className="block text-neutral-500 text-sm mb-3">
            Tell us how difficult it was
          </label>
          <div>
            <input
              type="radio"
              id="point10"
              value="10"
              {...register("point")}
              className="mr-3"
            />
            <label htmlFor="point10" className="font-semibold text-sm">
              Easy
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="point25"
              value="25"
              {...register("point")}
              className="mr-3"
            />
            <label htmlFor="point25" className="font-semibold text-sm">
              Medium
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="point50"
              value="50"
              {...register("point")}
              className="mr-3"
            />
            <label htmlFor="point50" className="font-semibold text-sm">
              Hard
            </label>
          </div>
          {errors.point && (
            <span className="text-red-500">{errors.point.message}</span>
          )}
        </div>
        <ElevateButton value="Edit"/>


        {submitted && (
          <p className="text-green-500">Form submitted successfully!</p>
        )}
      </form>
    </div>
  );
}
