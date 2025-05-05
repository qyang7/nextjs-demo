"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

const schema = z.object({
    answers: z.record(
        z.union([
            z.string().min(1, "Required"),
            z.array(z.string()).min(1, "Select at least one")
        ])
    ),
})

const mockDataPage1 = [
    {
        id: "q1",
        question: "Do you want to build a Snowman?",
        type: "radio",
        options: ["true", "false"],
    },
    {
        id: "q2",
        question: "Which of the following apply to you?",
        type: "checkbox",
        options: ["Option A", "Option B", "Option C"],
    },
]

const mockDataPage2 = [
    {
        id: "q3",
        question: "What is your favorite frontend framework?",
        type: "radio",
        options: ["React", "Vue", "Svelte", "Angular"],
    },
    {
        id: "q4",
        question: "Which technologies are you currently using?",
        type: "checkbox",
        options: ["TypeScript", "Tailwind CSS", "Next.js", "GraphQL"],
    },
]

let mockPage = 1

export default function QuestionPage() {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            answers: {},
        },
    })

    const fetchQuestions = async (prevAnswers = {}) => {
        setLoading(true)
        try {
            const res = await fetch("/api/questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers: prevAnswers }),
            })
            const data = await res.json()
            if (data?.type === "end") {
                toast.success("问卷填写完毕，感谢参与！")
                setQuestions([])
            } else {
                setQuestions(data)
            }
        } catch (e) {
            toast.error("Failed to load questions, using mock data.")
            const mock = mockPage === 1 ? mockDataPage1 : mockDataPage2
            setQuestions(mock)
            mockPage++
        } finally {
            setLoading(false)
            form.reset({ answers: {} })
        }
    }

    useEffect(() => {
        fetchQuestions()
    }, [])

    const onSubmit = async (values) => {
        toast.success("Submitted: " + JSON.stringify(values.answers))
        await fetchQuestions(values.answers)
    }

    if (loading) return <div className="text-center mt-20">Loading...</div>
    if (questions.length === 0) return <div className="text-center mt-20 text-lg">感谢，你的表单填写完毕 🎉</div>

    return (
        <div className="min-h-screen bg-[#f5f9ff] flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
                TELL US MORE ABOUT THE FEATURE YOU ARE WORKING ON?
            </h1>

            <div className="bg-white p-10 rounded-md  w-full max-w-xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
                        {questions.map((q) => (
                            <FormField
                                key={q.id}
                                control={form.control}
                                name={`answers.${q.id}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-blue-600 font-medium">
                                            <span className="text-red-600 mr-1">*</span>
                                            {q.question} <span>🤖</span>
                                        </FormLabel>
                                        <FormControl>
                                            {q.type === "radio" ? (
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex gap-6 pt-2 flex-wrap"
                                                >
                                                    {q.options.map((opt) => (
                                                        <FormItem
                                                            key={opt}
                                                            className="flex items-center space-x-2"
                                                        >
                                                            <FormControl>
                                                                <RadioGroupItem value={opt} />
                                                            </FormControl>
                                                            <FormLabel className="font-normal cursor-pointer">
                                                                {opt}
                                                            </FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            ) : (
                                                <div className="flex flex-wrap gap-4 pt-2">
                                                    {q.options.map((opt) => (
                                                        <FormItem key={opt} className="flex items-center space-x-2">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes?.(opt)}
                                                                    onCheckedChange={(checked) => {
                                                                        const newVal = checked
                                                                            ? [...(field.value || []), opt]
                                                                            : field.value.filter((v) => v !== opt)
                                                                        field.onChange(newVal)
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal cursor-pointer">
                                                                {opt}
                                                            </FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </div>
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </form>
                </Form>
            </div>
            <div className="flex justify-end gap-4 pt-6">
                <Button variant="outline" type="button">
                    Cancel
                </Button>
                <Button onClick={form.handleSubmit(onSubmit)} type="button">
                    Next
                </Button>
            </div>

        </div>
    )
}