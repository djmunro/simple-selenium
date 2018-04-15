---
title: "Selenium From The Ground Up: Setting Up Selenium"
date: "2018-04-05"
---

In this article i'm going to be explaining how to get selenium installed and change the default browser to Chrome using the ChromeDriver. Then we will write a simple program to verify that everything is up and running correctly. 
<!-- end -->

**Note*** I'll be writing the steps with Mac users in mind, but the equivalent steps should be easy to find with a quick google-search for other operating systems.

## Pre-requirements
* PyCharm installed (community is fine) - https://www.jetbrains.com/pycharm/download

Install homebrew and python2. *Remember these steps are intended for Mac users.*
```bash 
# install brew and python2
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install python@2
```

## Installing Selenium and ChromeDriver
```bash
$ pip install selenium
$ brew install chromedriver
```

## Writing First Test
Essentially that is all for the setup. We will install and import libraries as we need them. So we have our setup complete. It's time to create our "Hello World" equivalent project for selenium.

So, lets start by creating a new project.
1. Open PyCharm
2. Click Create New Project
3. Select a location e.g. /Users/../blog-testing
4. Create a new python file (File > New > Python File) named blog_test

In this tutorial, we're going to introduce just the basics of writing and executing the selenium driver. In further parts of the series, I will introduce test frameworks and structuring of our python code. So bare with me.

Next we're going to import our webdriver and navigate to https://www.google.com, to verify that selenium is installed correctly.

```python
# blog_test.py
from selenium import webdriver

driver = webdriver.Chrome()  # creates web-driver using Chrome
driver.get('https://www.google.com')  # navigate to google.com

```

## Running The Test

So we've built our first program using selenium. It will create a Chrome browser instance and navigate to https://www.google.com

We want to run the program, and verify it works. This is dead simple in PyCharm, just `right click in the source code window and click, Run 'blog_test'`

**Viola**. We see an instance of Chrome open, and that it navigates to google. However, the browser is left open, which is bad practice, so we need to close the browser after our program has finished. We do this by adding a `driver.close()`

```python
# blog_test.py
from selenium import webdriver

driver = webdriver.Chrome()
driver.get('https://www.google.com')
driver.close()  # close the browser
```

We run the program again, see that it navigates to google, then closes the browser afterwards.

## Conclusion

So we've setup all the basic dependencies to create basic programs in selenium using ChromeDriver and verified that we're able to drive browser automation through selenium. In the next article, we will introduce the **Unittest test framework** and start building out our tests against a website (my blog - http://simple-selenium.com/).

## References && Links

* [SeleniumHQ](https://www.seleniumhq.org/)
* [Homebrew](https://brew.sh/)
* [Python](https://www.python.org/)
* [PyCharm](https://www.jetbrains.com/pycharm/download)