import React, { useState, useEffect } from "react";

const InfiniteScrollComponent = () => {
  const [data, setData] = useState([]); // Dữ liệu để hiển thị
  const [page, setPage] = useState(1); // Số trang hiện tại
  const [loading, setLoading] = useState(false); // Trạng thái loading

  useEffect(() => {
    // Hàm để tải dữ liệu mới khi cuộn trang
    const loadMoreData = async () => {
      setLoading(true);
      // Thực hiện logic để tải dữ liệu từ API hoặc nguồn dữ liệu khác
      // Ở đây, chúng ta giả định fetchData là một hàm lấy dữ liệu từ API
      const newData = await fetchData(page);
      setData((prevData) => [...prevData, ...newData]); // Cập nhật dữ liệu mới
      setLoading(false);
    };

    const handleScroll = () => {
      // Kiểm tra xem người dùng đã cuộn đến cuối trang chưa
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        // Tải dữ liệu mới khi cuộn đến cuối trang
        if (!loading) {
          setPage((prevPage) => prevPage + 1); // Tăng số trang lên
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, loading]);

  return (
    <div>
      {/* Hiển thị dữ liệu */}
      {data.map((item) => (
        <div key={item.id}>{/* Hiển thị item */}</div>
      ))}
      {/* Hiển thị loading nếu đang tải */}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScrollComponent;
