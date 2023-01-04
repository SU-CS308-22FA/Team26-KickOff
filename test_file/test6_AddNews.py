

import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time


class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path="C:\\webdrivers\\chromedriver.exe")

    def test_search_in_python_org(self):



        driver = self.driver
        driver.get("https://kickoff-26.herokuapp.com/addnews")
        username = driver.find_element(By.ID, "username")
        password = driver.find_element(By.ID, "password")
        login = driver.find_element(By.ID, "login_button")
        username.send_keys("admin")
        password.send_keys("123456")
        login.click()
        
        time.sleep(3)
        title = driver.find_element(By.ID, "Title")
        link = driver.find_element(By.ID, "PictureLink")
        author = driver.find_element(By.ID, "Author")
        date = driver.find_element(By.ID, "Date")
        article = driver.find_element(By.ID, "Article")

        button = driver.find_element(By.ID, "myButton")

        time.sleep(2)

        title.send_keys("Test News")
        link.send_keys("https://www.hermesiletisim.net/uploads/2013/11/pazarlama-teknikleri-g%C3%B6nderim-testleri.jpg")
        author.send_keys("Ali Özgün Akyüz")
        date.send_keys("29.09.2023")
        article.send_keys("This is a selenium test.")

        button.click()
        
        time.sleep(2)
        
        self.assertIn("Successfully", driver.page_source)

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()