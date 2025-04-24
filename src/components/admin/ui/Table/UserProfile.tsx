import Avatar from "../Avatar/Avatar";

interface UserProfileProps {
    name: string;
    email: string;
    gender: 'male' | 'female'
}

export default function UserProfile({name, email, gender}: UserProfileProps) {
    return (
        <div className="user-profile">
            <span className="profile-avatar">
                <Avatar gender={gender} />
            </span>
            <div className="profile-text">
                <span className="profile-name">{name}</span>
                <span className="profile-email">{email}</span>
            </div>
        </div>
    );
}
