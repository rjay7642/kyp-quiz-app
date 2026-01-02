import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/leaderboard.css";

const Leaderboard = () => {
  const [list, setList] = useState([]);
  const [myStats, setMyStats] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  const myUserId = localStorage.getItem("kyp_user_id");
  const localUser = JSON.parse(localStorage.getItem("kyp_user"));

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from("daily_leaderboard")
      .select("user_id, name, centre, score")
      .eq("exam_date", today)
      .order("score", { ascending: false });

    if (!error && data) {
      setList(data);

      const myIndex = data.findIndex(
        (u) => u.user_id === myUserId
      );

      if (myIndex !== -1) {
        setMyStats({
          rank: myIndex + 1,
          aheadOf: data.length - (myIndex + 1),
          total: data.length
        });
      }
    }
  };

  useEffect(() => {
    fetchLeaderboard();

    const channel = supabase
      .channel("leaderboard-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "daily_leaderboard"
        },
        fetchLeaderboard
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const getRankBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <h2>Daily Leaderboard</h2>
        <span>Basic Computer • Today</span>
      </header>

      {myStats && (
        <div className="my-stats">
          <strong>Your Rank: #{myStats.rank}</strong>
          <p>
            You are ahead of{" "}
            <span>{myStats.aheadOf}</span>{" "}
            out of {myStats.total} students
          </p>
        </div>
      )}

      <div className="leaderboard-list">
        {list.map((u, index) => {
          const isMe = u.user_id === myUserId;

          return (
            <div
              key={u.user_id}
              className={`leaderboard-card ${
                isMe ? "me" : ""
              }`}
            >
              <div className="rank">
                {getRankBadge(index + 1)}
              </div>

              {/* PROFILE */}
              <div className="avatar">
                {isMe && localUser?.profilePic ? (
                  <img
                    src={localUser.profilePic}
                    alt="me"
                  />
                ) : (
                  <div className="avatar-fallback">
                    {u.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="user-info">
                <strong>
                  {u.name} {isMe && "(You)"}
                </strong>
                <small>
                  {u.centre}
                  {isMe && localUser?.district
                    ? ` • ${localUser.district}`
                    : ""}
                </small>
              </div>

              <div className="score">{u.score}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
