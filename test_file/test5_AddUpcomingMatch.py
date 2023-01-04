

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
        driver.get("https://kickoff-26.herokuapp.com/addUpcomingMatch")
        username = driver.find_element(By.ID, "username")
        password = driver.find_element(By.ID, "password")
        login = driver.find_element(By.ID, "login_button")
        username.send_keys("admin")
        password.send_keys("123456")
        login.click()
        
        time.sleep(3)
        hometeam = driver.find_element(By.ID, "hometeamU")
        awayteam = driver.find_element(By.ID, "awayteamU")
        stadium = driver.find_element(By.ID, "stadiumnameU")
        referee = driver.find_element(By.ID, "refereenameU")
        date = driver.find_element(By.ID, "dateU")
        button = driver.find_element(By.ID, "myButton")

        time.sleep(2)

        hometeam.send_keys("Galatasaray")
        awayteam.send_keys("Fenerbahçe")
        stadium.send_keys("Sabancı Uni")
        referee.send_keys("Sermet Özgü")
        date.send_keys("29.09.2000")

        button.click()
        
        time.sleep(2)
        
        self.assertIn("Successfully", driver.page_source)

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()