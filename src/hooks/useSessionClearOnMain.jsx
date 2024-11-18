import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { persistor } from "../store/store"; // redux-persist persistor
import { resetReservation } from "../store/flightSlice"; // 초기화 액션

function useSessionClearOnMain() {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {

        // redux-persist 데이터 비우기
        persistor.purge().then(() => {
            console.log("persisted state cleared.");
            sessionStorage.removeItem("persist:root"); // sessionStorage 비우기
            dispatch(resetReservation()); // Redux 상태 초기화
        });
    }, [location.pathname]);
}

export default useSessionClearOnMain;
