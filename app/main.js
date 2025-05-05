"use client"

import { useEffect, useState, useRef } from "react"
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

const mockDataPage1 = {
    data: {
        sessionId: "mock-session-1",
        questionList: [
            {
                id: "q1",
                question: "Do you want to build a Snowman?",
                optionType: "radio",
                options: ["true", "false"],
                key: "f_console_login_HS"
            },
            {
                id: "q2",
                question: "Which of the following apply to you?",
                optionType: "checkbox",
                options: ["Option A", "Option B", "Option C"],
                key: "multi_select_1"
            },
        ]
    }
}

const mockDataPage2 = {
    data: {
        sessionId: "mock-session-2",
        questionList: [
            {
                id: "q3",
                question: "What is your favorite frontend framework?",
                optionType: "radio",
                options: ["React", "Vue", "Svelte", "Angular"],
                key: "frontend_pref"
            },
            {
                id: "q4",
                question: "Which technologies are you currently using?",
                optionType: "checkbox",
                options: ["TypeScript", "Tailwind CSS", "Next.js", "GraphQL"],
                key: "tech_used"
            },
        ]
    }
}

let mockPage = 1

export default function QuestionPage() {
    const [questions, setQuestions] = useState([])
    const [sessionId, setSessionId] = useState(null)
    const [loading, setLoading] = useState(true)
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            answers: {},
        },
    })

    const fetchQuestions = async (prevAnswers = {}, prevSession = null) => {
        setLoading(true)
        const answerList = Object.entries(prevAnswers).map(([key, value]) => ({
            key,
            value: Array.isArray(value) ? value.join(",") : value
        }))

        try {
            const res = await fetch("/api/questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId: prevSession,
                    appId: 100,
                    featKey: "Hide and Seek",
                    release: "",
                    answerList,
                }),
            })
            const data = await res.json()
            const list = data?.data?.questionList || []
            if (list.length === 0) {
                toast.success("问卷填写完毕，感谢参与！")
                setQuestions([])
            } else {
                setSessionId(data.data.sessionId)
                setQuestions(list)
            }
        } catch (e) {
            toast.error("接口失败，使用 mock 数据。")
            const mock = mockPage === 1 ? mockDataPage1 : mockDataPage2
            setSessionId(mock.data.sessionId)
            setQuestions(mock.data.questionList)
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
        toast.success("提交中...")
        const mapped = {}
        questions.forEach(q => {
            mapped[q.key || q.id] = values.answers[q.id] || values.answers[q.key]
        })
        await fetchQuestions(mapped, sessionId)
    }

    if (loading) return <div className="text-center mt-20">Loading...</div>
    if (questions.length === 0) return <div className="text-center mt-20 text-lg">感谢，你的表单填写完毕 🎉</div>

    return (
        <div className="min-h-screen bg-[#f5f9ff] flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
                TELL US MORE ABOUT THE FEATURE YOU ARE WORKING ON?
            </h1>

            <div className="bg-white p-10 rounded-md w-full max-w-xl">
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
                                            {q.optionType === "radio" ? (
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
