import React, { useEffect, useState } from "react";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Spinner from "../ui/Spinner";
import ModalView from "../ui/ModalView";
import { IoLocationOutline } from "react-icons/io5";
import { FaLaptopCode } from "react-icons/fa6";
import Button from "../ui/Button";
import useUser from "../api/queries/useUser";

function Profile() {
    const { user, isError, isPending } = useUser();
    const [isProfileEditing, setIsProfileEditing] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    console.log(user, selectedImage);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        }
    }, [previewUrl]);

    /*
    const uploadImage = useMutation({
        mutationFn: uploadUserProfile(selectedImage),
        onSuccess: () => console.log("Image uploaded successfully"),
        onError: () => console.log("Image upload failed"),
    });
    */

    if (isPending) return <Spinner size={20} />
    if (isError) return <p>Cant fetch user</p>

    return (
        <div className="mx-4 py-4">
            <h3 className="font-bold">My Profile</h3>
            <div className="my-4 flex items-center gap-3">
                <img
                    src={previewUrl || user.avatar || "https://via.placeholder.com/80"}
                    alt="Profile Image"
                    className="size-20 text-sm rounded-full bg-brand-300" />

                <div className="flex flex-col gap-1 text-sm">
                    <span className="font-medium text-lg">{user.name}</span>
                    <span className="flex gap-1 items-center">
                        <FaLaptopCode size={20} />
                        {user.position || "Edit Position"}
                    </span>
                    <span className="flex gap-1 items-center">
                        <IoLocationOutline size={20} />
                        {user.location || "Edit location"}
                    </span>
                </div>

                <Button btn="primary" className="ml-auto" onClick={() => setIsProfileEditing(true)}>Edit</Button>

            </div>

            {/* PROFILE EDIT FORM */}
            <ModalView
                title="Profile Edit"
                isOpen={isProfileEditing} onClose={() => setIsProfileEditing(false)}>
                <form>
                    <FormRow>
                        <label>Name</label>
                        <Input />
                    </FormRow>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        placeholder="Upload Image"
                        className="file:mr-4 file:rounded-md file:border-0 file:bg-amber-300 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-amber-400"
                    />
                </form>
            </ModalView>
        </div>
    );
}

export default Profile;
