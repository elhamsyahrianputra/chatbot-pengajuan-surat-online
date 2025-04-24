export default function RequirementList({requirements}: {requirements: LetterRequirement[]}) {
    return (
        <ul className="requirement-list">
            {requirements?.map((requirement) => (
                <li key={requirement.id}>{requirement.name}</li>
            ))}
        </ul>
    );
}
