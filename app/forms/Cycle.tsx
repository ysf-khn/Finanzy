"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { format, isValid } from "date-fns";
import { CalendarDays } from "lucide-react";
// @ts-ignore
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  createCycle,
  getCurrentCycle,
  editCycleAction,
} from "@/lib/actions/cycle.action";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function convertISOStringToDesiredFormat(isoString: any) {
  const date = new Date(isoString);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Kolkata",
    timeZoneName: "shortOffset",
  };
  // @ts-ignore
  return date.toLocaleString("en-US", options);
}

const FormSchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  budget: z
    .string()
    .transform((v) => Number(v) || 0)
    .pipe(z.number().min(1)),
});

interface props {
  className?: React.HTMLAttributes<HTMLDivElement>;
  editCycle?: boolean;
  cycleData?: any;
  mongoUser: string;
  setSheetOpen?: any;
}

export function Cycle({
  className,
  mongoUser,
  editCycle,
  cycleData,
  setSheetOpen,
}: props) {
  // @ts-ignore
  const [date, setDate] = useState<DateRange | undefined>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: {
        from: cycleData ? new Date(cycleData.from) : new Date(),
        to: cycleData ? new Date(cycleData.to) : new Date(),
      },
      budget: cycleData?.budget.toString() || "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);

    try {
      if (editCycle) {
        if (new Date(values.date.from) < new Date(cycleData.from)) {
          return toast({
            title: "Not Allowed",
            description:
              "Cannot change the cycle starting date to a previous date!",
            variant: "destructive",
          });
        }

        await editCycleAction({
          cycleId: cycleData._id,
          from: values.date.from,
          to: values.date.to,
          budget: values.budget,
        });
      } else {
        const mongoUserObj = JSON.parse(mongoUser);
        const latestCycle = await getCurrentCycle({
          userId: mongoUserObj._id,
        });
        if (latestCycle) {
          if (new Date(latestCycle.to) >= new Date(values.date.from))
            return console.log(
              "Enter a date that is after the previous cycle end date"
            );
        }

        await createCycle({
          from: values.date.from,
          to: values.date.to,
          budget: values.budget,
          user: JSON.parse(mongoUser),
        });
      }
      setSheetOpen(false);

      router.push("/");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-sm:text-left"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Cycle Range</FormLabel>
              <div className={cn("grid gap-2", className)}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        " justify-start text-left font-normal w-full dark:bg-black",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Select cycle range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 max-sm:mr-3"
                    align="start"
                  >
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={field.value}
                      onSelect={(e) => {
                        field.onChange(e);
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget</FormLabel>
              <FormControl>
                <Input placeholder="₹" {...field} className="dark:bg-black" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="primary-gradient">
          {editCycle ? "Save Changes" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
