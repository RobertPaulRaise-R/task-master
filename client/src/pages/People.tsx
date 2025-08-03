import { useEffect, useState } from "react";
import Input from "../ui/Input";
import { UserI } from "../types";
import Button from "../ui/Button";
import { useFriends } from "../hooks/useFriends";
import Spinner from "../ui/Spinner";
import { getUserForFriendRequest } from "../services/userApi";
import { useMutation } from "@tanstack/react-query";
import { acceptFriendRequests, sendFriendRequest } from "../services/friendApi";
import { useFriendRequests } from "../hooks/useFriendRequests";
import ListSection from "../features/dashboard/ListSection";

function People() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [friends, setFriends] = useState<UserI[] | null>([]);
  const [requests, setRequests] = useState<
    { _id: string; status: string; user: UserI }[] | null
  >([]);

  const [searchResult, setSearchResult] = useState<{
    friend: {
      _id: string;
      name: string;
      avatar?: string;
    };
    status: "pending" | "accepted" | "rejected" | "none";
    requestDirection: "received" | "sent";
  } | null>(null);

  const {
    friends: friendsData,
    error: friendsError,
    isPending: friendsPending,
  } = useFriends();

  const {
    friendRequests: friendRequestsData,
    error: friendRequestsError,
    isPending: friendRequestsPending,
  } = useFriendRequests();

  useEffect(() => {
    if (friendsData) {
      setFriends(friendsData);
    }

    if (friendRequestsData) {
      setRequests(friendRequestsData);
    }
  }, [friendsData, friendRequestsData]);

  const handleSearch = async () => {
    const data = await getUserForFriendRequest(searchInput);
    setSearchResult(data);
  };

  const sendRequestMutation = useMutation({
    mutationFn: (userId: string | undefined) => sendFriendRequest(userId),
    onSuccess: () => {},
  });

  const acceptRequestMutation = useMutation({
    mutationFn: (friendId: string | undefined) =>
      acceptFriendRequests(friendId),
    onSuccess: () => {},
  });

  const handleSendFriendRequest = () => {
    sendRequestMutation.mutate(searchResult?.friend._id);
  };

  const handleAcceptFriendRequest = (friendId: string) => {
    acceptRequestMutation.mutate(friendId);
  };

  const isPending = friendsPending || friendRequestsPending;
  const error = friendsError || friendRequestsError;

  if (isPending) return <Spinner size={20} />;

  if (error) return <p>Error fetching friends</p>;

  return (
    <div className="m-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="border-light-300 rounded-lg border px-4 py-6">
        <div className="flex justify-between gap-2">
          <Input
            placeholder="search with username or email"
            value={searchInput}
            width="w-full"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <div>
          {searchResult && (
            <div className="border-light-400 mt-4 flex items-center justify-between gap-2 border p-4">
              <UserNameAndProfile name={searchResult.friend.name} />

              <Button
                onClick={
                  searchResult.requestDirection === "received"
                    ? () => handleAcceptFriendRequest(searchResult._id)
                    : searchResult.status === "none"
                      ? handleSendFriendRequest
                      : null
                }
                disabled={
                  searchResult.status !== "none" &&
                  searchResult.requestDirection !== "received"
                }
              >
                {
                  searchResult.status === "none"
                    ? "Send Request"
                    : searchResult.requestDirection === "received" // Check this first for 'pending' status
                      ? "Accept Request" // Or "Accept / Decline"
                      : searchResult.requestDirection === "sent"
                        ? "Requested" // I sent the request, waiting for them
                        : searchResult.status === "accepted"
                          ? "Friend" // Already friends
                          : searchResult.status === "rejected"
                            ? "Rejected" // Request was rejected (by them or me)
                            : "Unknown Status" // Fallback
                }
              </Button>
            </div>
          )}
        </div>
      </div>

      <ListSection className="h-fit">
        <ListSection.Header label="Friend Requests" />

        <ListSection.List>
          {requests && requests.length > 0 ? (
            requests.map((request) => (
              <div className="flex items-center justify-between">
                <p>{request.user.name}</p>
                <Button onClick={() => handleAcceptFriendRequest(request._id)}>
                  Accept
                </Button>
              </div>
            ))
          ) : (
            <p className="mt-4 text-center">No Friends</p>
          )}
        </ListSection.List>
      </ListSection>

      <ListSection>
        <ListSection.Header label="All Friends" />

        <ListSection.List>
          {friends && friends.length > 0 ? (
            friends.map((friend: UserI) => (
              <div className="flex justify-between">
                <UserNameAndProfile name={friend.name} />
              </div>
            ))
          ) : (
            <p className="mt-4 text-center">No Friends</p>
          )}
        </ListSection.List>
      </ListSection>
    </div>
  );
}

function UserNameAndProfile({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`bg-light-300 relative size-10 rounded-full`}>
        <span className="text-brand-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold">
          {name[0]}
        </span>
      </div>
      <p>{name}</p>
    </div>
  );
}

export default People;
