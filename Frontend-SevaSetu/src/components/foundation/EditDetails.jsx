import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import InputField from "../auth/Inputfield";
import FileUpload from "../auth/FileUpload";
import TextArea from "../auth/Textfield";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { server } from "@/main";

const EditDetails = ({foundation,onUpdate}) => {
  const {id} = useParams();
    const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [foundationImageUrl, setFoundationImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    foundation_name: "",
    foundation_short_description: "",
    foundation_cause: "",
    foundation_impact: "",
  });

  useEffect(() => {
    setFoundationImageUrl(foundation.foundation_image_url);
    setFormData({
      foundation_name: foundation.foundation_name,
      foundation_short_description: foundation.foundation_short_description,
      foundation_cause: foundation.foundation_cause,
      foundation_impact: foundation.foundation_impact,
    });
  }, [foundation]);


  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevStat) => ({ ...prevStat, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (foundationImageUrl) {
      const finalData = {...formData,foundation_image_url:foundationImageUrl,id}
      try {
        const { data } = await axios.post(`${server}/api/foundation/editdetails`, finalData);

        if (data.success) {
          console.log(data.message);
          console.log(finalData)
          onUpdate(finalData);
          //   dispatch(setUserLocalStorage(data.userId));
          navigate(`/foundation/details/${id}`);
          
        }
        toast.success(data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else toast.error("An error occurred while fetching data");
      }
    } else {
      toast.error("Please Submit all the details before Submiting");
    }
    setOpen(false)
  };
  return (
    <Dialog open={open} onOpenChange={setOpen} className="scroll-auto">
      <DialogTrigger asChild>
        <Button variant="outline">Edit Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[70vw]">
        <DialogHeader>
          <DialogTitle>Edit Details</DialogTitle>
          <DialogDescription>
            Make changes here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="" method="POST" onSubmit={handleSubmit}>
          <div className=" py-4">
            <div className="items-center gap-4">
              <InputField
                label="Name of the Foundation"
                name="foundation_name"
                type="text"
                placeholder="Enter Username"
                value={formData.foundation_name}
                onChange={handleChange}
              />

              <TextArea
                label="Short Description"
                name="foundation_short_description"
                placeholder="Enter Foundation description"
                value={formData.foundation_short_description}
                onChange={handleChange}
              />

              <TextArea
                label="Cause"
                name="foundation_cause"
                placeholder="Enter detailed Cause your Foundation working"
                value={formData.foundation_cause}
                onChange={handleChange}
              />
              <TextArea
                label="Impact"
                name="foundation_impact"
                placeholder="Enter details Impact created by your Foundation"
                value={formData.foundation_impact}
                onChange={handleChange}
              />
              <FileUpload
                Id="add_foundation_image"
                ImageUrl={foundationImageUrl}
                label="Add Foundation Image"
                setImageUrl={setFoundationImageUrl}
                isUploading={isUploading}
                setIsUploading={setIsUploading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDetails;
