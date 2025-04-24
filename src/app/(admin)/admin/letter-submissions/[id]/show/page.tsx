import { letterSubmissionService } from "@/api/services/letter-submission.services";
import React from "react";

type ShowPageProps = {
    params: {
        id: string;
    };
};

export default async function ShowPage({ params }: ShowPageProps) {
    const { id } = params;

    const letterSubmission = await letterSubmissionService.getById(id, {
        include: "user",
    });

    console.log(letterSubmission);

    return <div>{letterSubmission && letterSubmission.user?.name}</div>;
}
