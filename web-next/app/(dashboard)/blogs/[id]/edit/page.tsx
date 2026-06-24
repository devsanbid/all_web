export default async function Page({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <div>Edit Blog with ID: {id}</div>
    );
}

// Create a path
// /person
// /person/blogs
// /person->blogs->[slug]->edit