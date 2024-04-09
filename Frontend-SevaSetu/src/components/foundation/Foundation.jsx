import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFoundation } from "@/Redux/foundationSlice";
import FoundationCard from "./FoundationCard";
import EditDetails from "./EditDetails";
import ShareLink from "./ShareLink";
import { Loading } from "../Loading";
import { server } from "@/main";

const Foundation = () => {
  const [foundation, setFoundation] = useState({});
  const [loading, setLoading] = useState(true); // State to track loading status
  let { id } = useParams();
  const { userId } = useSelector((state) => state.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFoundation = async () => {
      console.log("here");
      try {
        const response = await fetch(`${server}/api/foundation/details/${id}`);
        if (!response.ok) {
          const errorMessage = await response.text();
          toast.error(errorMessage || "Data not found");
        } else {
          const data = await response.json();
          setFoundation(data);
          dispatch(addFoundation(data));
        }
      } catch (error) {
        console.error("Error fetching foundation data:", error);
      } finally {
        setLoading(false); // Update loading state once data fetching is complete
      }
    };
    fetchFoundation();
  }, [id]);

  const updateFoundationData = (updatedData) => {
    setFoundation(updatedData);
    dispatch(addFoundation(updatedData)); // Update Redux store if needed
  };

  return (
    <>
      {loading ? ( // Display loading indicator if data is being fetched
        <Loading />
      ) : foundation ? (
        <>
          <Card className=" relative w-[85vw] p-4 mx-auto my-10 mt-24">
            <FoundationCard foundation={foundation} />
            <CardContent className="font-sans font-semibold text-card-foreground text-md md:text-lg flex justify-center items-start gap-3">
              <span className="flex self-center">
                Take Charge and Make Someone's Life Better
              </span>
              <ShareLink id={foundation._id} />
            </CardContent>
          </Card>
          <p className="px-4 my-4 mx-auto w-4/5 flex gap-3 justify-end text-s md:text:xl">
            {!userId ? (
              <Button
                size="lg"
                variant="default"
                onClick={() => navigate(`/addPaymentDetail/${foundation?._id}`)}
              >
                Donate Now!
              </Button>
            ) : (
              foundation && (
                <EditDetails
                  foundation={foundation}
                  onUpdate={updateFoundationData}
                />
              )
            )}
          </p>
        </>
      ) : (
        <Navigate to="/NotFound" />
      )}
    </>
  );
};

export default Foundation;
