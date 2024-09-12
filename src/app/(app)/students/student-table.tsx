'use client'
import { Metadata } from 'next'
import StudentTable from './_components/student-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from "axios"
import useSWR from 'swr'
import { err, ok, Result } from "neverthrow"
import Text from '@/components/ui/text'
import { attendanceBackend } from '@/lib/axios/attendance-instance'
import { SmallErrorCard } from '@/components/mini-error-panel'
import MiniSkeletonLoader from '@/components/mini-skeleton-loader'

function getStudents(url: string): Promise<Result<[], any>> {
    return attendanceBackend.get("/students").then(fetched => {
        if (fetched.status !== 200) {
            return err(fetched.data.message)
        } else {
            return ok(fetched.data.data)
        }
    }).catch(e => err(e.message))
}

export const StudentTableBlock = () => {
    const { data: studentResult, error, isLoading, mutate } = useSWR("/students-global", getStudents)
    if (error) {
        return <SmallErrorCard message={error.message} />
    }

    if (studentResult && studentResult?.isErr()) {
        return <div><SmallErrorCard message={studentResult.error} /></div >
    }
    const students = studentResult

    console.log("GEN", students?.unwrapOr([]))
    if (isLoading) {
        return <div><MiniSkeletonLoader /></div>
    }
    if (error) {
        return <div><Text>Error: {error}</Text></div >
    }
    return (
        <StudentTable data={students?.unwrapOr([]) ?? []} mutate={mutate} />
    )
}
