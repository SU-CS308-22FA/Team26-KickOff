

import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support.ui import Select


class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path="C:\\webdrivers\\chromedriver.exe")

    def test_search_in_python_org(self):
        team1 = "Galatasaray"
        team2 = "Alanyaspor"
        driver = self.driver
        driver.get("https://kickoff-26.herokuapp.com/team_comparison")
        elem = Select(driver.find_element(By.ID, "select1"))
        time.sleep(1)
        elem.select_by_value(team1)
        time.sleep(1)
        elem2 = Select(driver.find_element(By.ID, "select2"))
        time.sleep(1)
        elem2.select_by_value(team2)

        time.sleep(1)

        self.assertIn(team1, driver.page_source)
        self.assertIn(team2, driver.page_source)

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()