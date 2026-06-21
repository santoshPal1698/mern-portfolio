import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../Api/Endpoints";
import { hideLoading, ReloadData, SetPortfolioData, showLoading } from "../redux/rootSlice";
import { message } from "antd";


const DataFetcher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { portfolioData, reloadData } = useSelector((state) => state.root);
  const pathParts = location.pathname.split("/"); // ['', 'user', 'yogesh']
  const name = pathParts[1] === "user" ? pathParts[2] : undefined;

  useEffect(() => {
    if (!portfolioData || reloadData) {
      if (name) {
        // alert(`data Fetching portfolio data for user: ${name}`);
        getAllPortFoliobyName(name); 
      } else {
        // alert("data Fetching default portfolio data");
        getAllPortFolio(); 
      }
    }
  }, [portfolioData, reloadData, name]);

 const getAllPortFolio = async () => {
  dispatch(showLoading());
  try {
    const { data } = await axios.get(
      `${PORTFOLIOPOINTS.ApiBaseUrl}get-portfolio`
    );
    dispatch(SetPortfolioData(data?.data || []));
    dispatch(ReloadData(false));
  } catch (error) {
  message.error(
        error?.response?.data?.message || "Something went wrong"
      );
  } finally {
    dispatch(hideLoading());
  }
};
  const getAllPortFoliobyName = async (name) => {
    dispatch(showLoading());
    try {
      const { data } = await axios.get(`${PORTFOLIOPOINTS.ApiBaseUrl}get-portfolio/${name}`);
      dispatch(SetPortfolioData(data?.data || []));
      dispatch(ReloadData(false));
    } catch (error) {
      // message.error(error.response.data.message);
      const status = error?.response?.status;
    if (status == 429 || status == 404) {
      navigate("/429");
      message.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
    } finally {
      dispatch(hideLoading());
    }
  };

  return null;
};

export default DataFetcher;