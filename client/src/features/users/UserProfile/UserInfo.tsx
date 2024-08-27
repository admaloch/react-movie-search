export default function UserInfo({ user }) {

    return (
        <>
            <h1>{user.username}'s Profile</h1>
            <h2>Info:</h2>
            {user.isAdmin && <p>Admin user</p>}
            <p>Contact: {user.email}</p>
            <h2>Liked Content:</h2>
        </>
    )
}
