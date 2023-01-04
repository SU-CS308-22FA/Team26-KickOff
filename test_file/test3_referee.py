import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support.ui import Select

class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        s=Service(executable_path="C:\\webdrivers\\chromedriver.exe")
        self.driver = webdriver.Chrome(service=s)

    def test_search_in_python_org(self):
        driver = self.driver
        time.sleep(2)
        driver.get("https://kickoff-26.herokuapp.com/referees")
        elem = Select(driver.find_element(By.ID, "select1"))
        time.sleep(2)
        elem.select_by_value("Super League Assisting Referee")
        time.sleep(2)
        elem2 = driver.find_element(By.CLASS_NAME, "button-7")
        time.sleep(2)
        elem2.click()
        time.sleep(3)
        self.assertIn("Abdullah Bora Özkara", driver.page_source)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()