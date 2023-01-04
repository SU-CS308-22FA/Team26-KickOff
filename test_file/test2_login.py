

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
        driver.get("https://kickoff-26.herokuapp.com/")
        time.sleep(10)
        username = driver.find_element(By.ID, "username")
        password = driver.find_element(By.ID, "password")
        login = driver.find_element(By.ID, "login_button")
        username.send_keys("admin")
        password.send_keys("123456")
        login.click()
        time.sleep(10)
        actualUrl = "https://kickoff-26.herokuapp.com/"
        expectedUrl = driver.current_url
        self.assertTrue(expectedUrl.startswith(actualUrl))

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()