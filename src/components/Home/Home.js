import React from 'react';

function Home() {
    return (
        <div style={{ display: 'flex' }}>
            <ul style={{ margin: '0 auto' }}>
                <h3>DANH SÁCH CHỨC NĂNG CƠ BẢN</h3>
                <li>Đăng nhập</li>
                <li>Thêm user</li>
                <li>Sửa user</li>
                <li>Xóa user</li>
                <li>Hiển thị danh sách user</li>
                <li>Tìm kiếm user theo email</li>
                <li>Sắp xếp theo id, first name</li>
                <li>Import user từ file csv</li>
                <li>Export user ra file csv</li>
            </ul>
        </div>
    );
}

export default Home;
