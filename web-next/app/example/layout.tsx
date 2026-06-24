export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            <div className="border p-4">Example Header</div>
                {children}
            <div className="border p-4">Example Footer</div>
        </section>
    );
}