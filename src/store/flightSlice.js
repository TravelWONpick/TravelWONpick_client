// store/flightSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 1단계: 항공편 선택 데이터
  flightInfo: {
    selectedOutbound: null, // 선택된 가는편 항공편
    selectedReturn: null, // 선택된 오는편 항공편
    adultCount: 1, // 성인 승객 수 (최대 3명)
    tripType: "round", // 여행 타입 (왕복/편도)
    totalPrice: 0,
  },

  // 2단계: 승객 정보
  passengerInfo: {
    passengers: [], // 승객 정보 배열 (최대 3명)
    // 승객 정보 형태:
    // {
    //   lastName: '',        // 영문 성
    //   firstName: '',       // 영문 이름
    //   birthDate: '',       // 생년월일
    //   gender: '',          // 성별
    //   phone: ''           // 연락처
    // }
  },

  // 현재 예약 진행 단계
  currentStep: 1, // 1: 항공편선택, 2: 승객정보
};

export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setFlightSelection: (state, action) => {
      const {
        selectedOutbound,
        selectedReturn,
        adultCount,
        tripType,
        passengers,
      } = action.payload;
      state.flightInfo = {
        ...state.flightInfo,
        selectedOutbound,
        selectedReturn,
        adultCount,
        tripType,
        totalPrice: calculateTotalPrice(
          selectedOutbound,
          selectedReturn,
          adultCount
        ),
      };
      if (passengers) {
        state.passengerInfo.passengers = passengers;
      }
      state.currentStep = 2;
    },

    // 새로 추가하는 개별 액션들
    setSelectedOutbound: (state, action) => {
      state.flightInfo.selectedOutbound = action.payload;
      state.flightInfo.totalPrice = calculateTotalPrice(
        action.payload,
        state.flightInfo.selectedReturn,
        state.flightInfo.adultCount
      );
    },

    setSelectedReturn: (state, action) => {
      state.flightInfo.selectedReturn = action.payload;
      state.flightInfo.totalPrice = calculateTotalPrice(
        state.flightInfo.selectedOutbound,
        action.payload,
        state.flightInfo.adultCount
      );
    },

    setAdultCount: (state, action) => {
      state.flightInfo.adultCount = action.payload;
      state.flightInfo.totalPrice = calculateTotalPrice(
        state.flightInfo.selectedOutbound,
        state.flightInfo.selectedReturn,
        action.payload
      );
    },

    setTripType: (state, action) => {
      state.flightInfo.tripType = action.payload;
      if (action.payload === "oneway") {
        state.flightInfo.selectedReturn = null;
      }
      state.flightInfo.totalPrice = calculateTotalPrice(
        state.flightInfo.selectedOutbound,
        state.flightInfo.selectedReturn,
        state.flightInfo.adultCount
      );
    },

    // 2단계: 승객 정보 관련 액션
    // 승객 추가
    addPassenger: (state, action) => {
      if (state.passengerInfo.passengers.length < 3) {
        // 최대 3명까지만 추가 가능
        state.passengerInfo.passengers.push(action.payload);
      }
    },

    // 승객 정보 수정
    updatePassenger: (state, action) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.passengerInfo.passengers.length) {
        state.passengerInfo.passengers[index] = data;
      }
    },

    // 승객 정보 삭제
    removePassenger: (state, action) => {
      const index = action.payload;
      state.passengerInfo.passengers = state.passengerInfo.passengers.filter(
        (_, i) => i !== index
      );
    },

    // 단계 변경
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },

    // 모든 데이터 초기화
    resetReservation: () => initialState,
  },
});

// 가격 계산 헬퍼 함수
const calculateTotalPrice = (outbound, return_, adultCount) => {
  let total = 0;
  if (outbound) total += outbound.specialPrice * adultCount;
  if (return_) total += return_.specialPrice * adultCount;
  return total;
};

// 모든 액션 export
export const {
  setFlightSelection,
  setSelectedOutbound,
  setSelectedReturn,
  setAdultCount,
  setTripType,
  addPassenger,
  updatePassenger,
  removePassenger,
  setStep,
  resetReservation,
} = flightSlice.actions;

export default flightSlice.reducer;
