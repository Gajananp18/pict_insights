CREATE DATABASE IF NOT EXISTS pictinsights;

USE pictinsights;

CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    roll_no INT,
    reg_no VARCHAR(255),
    batch_year INT ,
    graduated_year INT,
    profile_picture_url VARCHAR(255),
    bio TEXT,
    linkedin_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_token (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL,
    fk_student INT NOT NULL,
    created_at TIMESTAMP,
    CONSTRAINT fk_student FOREIGN KEY (fk_student) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_token (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    fk_admin INT NOT NULL,
    created_at TIMESTAMP,
    CONSTRAINT fk_admin FOREIGN KEY (fk_admin) REFERENCES admins(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS college_notice (
    notice_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    notice_admin INT NOT NULL,
    event_date DATETIME,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT notice_admin FOREIGN KEY (notice_admin) REFERENCES admins(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS college_placement_blog (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    placement_admin INT NOT NULL,
    image_url VARCHAR(255),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT placement_admin FOREIGN KEY (placement_admin) REFERENCES admins(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS college_internship_blog (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    intern_admin INT NOT NULL,
    image_url VARCHAR(255),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT intern_admin FOREIGN KEY (intern_admin) REFERENCES admins(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- CREATE TABLE IF NOT EXISTS college_insights (
--     content_id INT AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     content TEXT,
--     author VARCHAR(50),
--     event_date DATETIME,
--     image_url VARCHAR(255),
--     content_type ENUM('event', 'placement_blog', 'internship_blog') NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE IF NOT EXISTS student_connections (
--     connection_id INT AUTO_INCREMENT PRIMARY KEY,
--     student_id1 INT NOT NULL,
--     student_id2 INT NOT NULL,
--     connection_status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
--     connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     CONSTRAINT fk_student_id1 FOREIGN KEY (student_id1) REFERENCES students(id),
--     CONSTRAINT fk_student_id2 FOREIGN KEY (student_id2) REFERENCES students(id),
--     CONSTRAINT unique_connection UNIQUE (student_id1, student_id2)
-- );