---
title: "Selenium From The Ground Up: Using Unittest Test Framework"
date: "2018-04-14"
---

In the last article of [Selenium From The Ground Up: XPath Locators](http://simple-selenium.com/2018-04-08-ground-up-locators/) we learned how to locate different elements on a webpage using the xpath locator. 

In this article we will take our existing test and rebuild it out again in pythons [Unittest](https://docs.python.org/2/library/unittest.html).

Let's jump right in. Begin by opening our blog-testing project in python, and opening our blog_test.py file

# Building Test Class
First we thing we need to do is to import unittes, so we can use this library within our blog_test.py file. So at the top of the file import unittest
``` python
# blog_test.py
import unittest
```

Next we want to build a skeleton for our test cases to live in. At thr bottom of blog_test.py copy-pasta the following code.

``` python
class BlogTesting(unittest.TestCase):

    def setUp(self):
        pass

    def test_post_navigation(self):
        pass

    def tearDown(self):
        pass

if __name__ == '__main__':
    unittest.main()
```

Couple of things i'd like to point out for this.
* __class BlogTesting(...)__ - this can be whatever you desire. It should represent what the test cases are doing. In this case, we're testing the blog, so I used BlogTesting
* __setUp(self) / tearDown(self)__ - these are methods that will be called before each test case, and after each test. Right now i'm ust creating the structure as I know we will need them. After we add pieces to setUp and tearDown, I'm sure it will all be clear.
* __test\_post_navigation(self)__ - this is the bread and butter. **ALL TEST CASES MUST BEGIN WITH "test_" OR THEY WILL NOT BE EXECUTED.** What comes after "test_" explains what the test is doing. We're testing that post navigation works, hence, test_post_navigation
* __if \_\_name\_\_ == '\_\_main\_\_': unittest.main()__ - this will allow us to run our tests. We ABSOLUTELY NEED THIS.    

# Pulling In The Existing Post Test
We have the skeleton built out now for our test suit in unittest. Sweet. Let's now take our existing test case and move it into test_post_navigation. blog_test.py should look something like this:

``` python
# blog_test.py
import time
import unittest

from selenium import webdriver


class BlogTesting(unittest.TestCase):

    def setUp(self):
        pass

    def test_post_navigation(self):
        # 1. create webdriver
        driver = webdriver.Chrome()

        # 2. navigate to http://simpleselenium.com
        driver.get('http://www.simpleselenium.com')

        # 3. Get the name of the first post
        first_post = driver.find_element_by_xpath('(//div[@data="post"]//h3)[1]')
        first_post_name = first_post.text

        # 4. click on the first post
        first_post.click()
        time.sleep(3)  # wait for page to load

        # 5. verify that the post title matches the name saved from step 3
        current_post = driver.find_element_by_xpath('//div[@data="post"]/h1')
        current_post_name = current_post.text

        # assert that the post name matches the name of the first post on the posts page
        assert first_post_name == current_post_name, 'Expected the name of the post to be {}, instead was {}'.format(
            first_post_name,
            current_post_name
        )

        # 6. close webdriver
        driver.close()

    def tearDown(self):
        pass

if __name__ == '__main__':
    unittest.main()
```

Lets verify that the test cases still indeed works by clicking on the green triangle to the left of "test\_post\_navigation" or right-clicking on the test cases, and clicking "Run blog_test".

Success, we see this in the output
``` bash
.
----------------------------------------------------------------------
Ran 1 test in 8.072s

OK
```

# New Test Case
Lets create another test to verify that our navigation links goto an actual page, and are not broken.

Link before, let's being by writing pseudo-code for what we want the test to do.

``` python
# blog_test.py
...
class BlogTesting(unittest.TestCase):

    ...

    def test_post_navigation(self):
        ...

    def test_navigation_links_work(self):
        # 1. create webdriver
        # 2. navigate to http://simpleselenium.com
        # 3. get the navigation link names
        # 4. verify navigation names are ['Home', 'About', 'GitHub']
        # 5. navigate to each navigation link and verify they're on the right page
        # 6. close webdriver
        pass
```

We immediately spot non-DRY code (Dont-Repeat-Yourself). In the previous test (verifying post navigation) we have the following steps:
1. create webdriver
2. navigate to http://simpleselenium.com
3. Get the name of the first post
4. click on the first post
5. verify that the post title matches the name saved from step 3
assert that the post name matches the name of the first post on the posts page
6. close webdriver

We see that steps 1, 2, and 6 repeat eachother in both test cases. So before implementing the next test case lets pull those steps out into setUp(), and tearDown(). The test suite should now look like this

``` python
# blog_test.py

...

class BlogTesting(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http://www.simpleselenium.com')

    def test_post_navigation(self):
        # 1. Get the name of the first post
        first_post = self.driver.find_element_by_xpath('(//div[@data="post"]//h3)[1]')
        first_post_name = first_post.text

        # 2. click on the first post
        first_post.click()
        time.sleep(3)  # wait for page to load

        # 3. verify that the post title matches the name saved from step 3
        current_post = self.driver.find_element_by_xpath('//div[@data="post"]/h1')
        current_post_name = current_post.text

        # 4. assert that the post name matches the name of the first post on the posts page
        assert first_post_name == current_post_name, 'Expected the name of the post to be {}, instead was {}'.format(
            first_post_name,
            current_post_name
        )

    def test_navigation_links_work(self):
        # 1. get the navigation link names
        # 2. verify navigation names are ['Home', 'About', 'GitHub']
        # 3. navigate to each navigation link and verify they're on the right page
        pass

    def tearDown(self):
        self.driver.close()
```

Re-run the test. SUCCESS! Now we can begin implementing the next test cases.

We start by implementing the first step in our "test_navigation_links_work" tes t. To do this, we need to find the correct xpath to select all the link names. We did this in our last article, so we know we should right-click on one of the navigation elements (e.g. About) and click "Inspect". We see multiple `<a href="">...` elements for the various navigation links.

``` html
<ul class="css-16qntt" data-testid="navigation">
  <a href="/" class="css-glamorous-a-h8udln">Home</a>
  <a href="/about" class="css-glamorous-a-h8udln">About</a>
  <a href="https://github.com/djmunro" class="css-glamorous-a-1xytto">GitHub</a>
</ul>
```

Right away we spot `<ul ... data-testid="navigation"` and know we can use this in conjunction with the `<a>` tag to select all the navigation links. So a acceptable xpath for this is `//ul[@data-testid="navigation"]/a` we can test this in our Chrome developer tools by doing a control+f in the Elements window and pasting the xpath locator. You should see the first element `<a href="/" class="...">Home</a>` selected.

We now have the tools to implement almost the rest of the test. We can now get the link names, verify the names, navigate to the links... but cannot verify the pages we navigated to are correct. For now lets implement what we know.

``` python
# blog_test.py

class BlogTesting(unittest.TestCase):
    ...
    def test_navigation_links_work(self):
    # 1. get the navigation link names
    navigation_items = self.driver.find_elements_by_xpath('//ul[@data-testid="navigation"]/a')

    # 2. verify navigation names are ['Home', 'About', 'GitHub']
    expected_link_names = {'Home', 'About', 'GitHub'}
    navigation_links_names = set([link.text for link in navigation_items])
    self.assertEquals(expected_link_names, navigation_links_names)

    # 3. navigate to each navigation link and verify they're on the right page
    navigation_links = {link.text: link.get_attribute("href") for link in navigation_items}
    for link_text, url in navigation_links.items():
        self.driver.get(url)
        time.sleep(3)
        # verify we're on the right page
```

Is what I came up with. In step 2 we're verifying that the link names are what I expected. **Note** we see `self.assertEquals()`, this is a unittest method that we can use to verify if 2 things are equal. If you want to find out more about what assertions Unittest offers, visit https://docs.python.org/2/library/unittest.html.

In step 3 you can see I created a dictionary, the key is the link text, and value is the url of the link. I'm doing this so we have a reference to the name of the link to use when verifying if we're on right page or not.

We have 3 different pages and kinds of checks:
1. We're on the home page so url is just www.simpleselenium.com
2. We're on About Page page, so About is in page body
2. The link is GitHub, and we want to verify it's my GitHub page

let's write the pseudo-code for that

``` python
# blog_test.py

class BlogTesting(unittest.TestCase):
    ... 
    # 3. navigate to each navigation link and verify they're on the right page
    navigation_links = {link.text: link.get_attribute("href") for link in navigation_items}
    for link_text, url in navigation_links.items():
        self.driver.get(url)
        time.sleep(3)
        # verify we're on the right page
        if link_text == 'Home':
            # verify url is www.simpleselenium.com
            pass
        elif link_text == 'About':
            # verify link_text is in page heading
            pass
        elif link_text == 'GitHub':
            # verify my names on the github page
```

This seems simple enough, lets start by verifying that it's my GitHub page. I'll run through this part quickly as we've use xpath locators multiple times now to find elements on a webpage. But i'll give the high-level process I did to get the right info.

1. Went to my github page, https://github.com/djmunro
2. Found the xpath selector for my name (under the image) `(//h1[@class="vcard-names"]/span)[1]` - 1st span element under the h1 tag

Lets update our test. And for the sake of passing lets use pass to pass the other cases where the link name is in the page body. We will come back and implement this next. But I do this to verify that the added functionality works before moving on.

``` python
# blog_test.py

class BlogTesting(unittest.TestCase):
    ...
    # 3. navigate to each navigation link and verify they're on the right page
    for link_text, url in navigation_links.items():
        self.driver.get(url)
        time.sleep(3)
        # verify we're on the right page
        if link_text == 'Home':
            # verify url is www.simpleselenium.com
            pass
        elif link_text == 'About':
            # verify link_text is in page heading
            pass
        elif link_text == 'GitHub':
            # verify my names on the github page
            self.assertEquals(
                'David Munro',
                self.driver.find_element_by_xpath('(//h1[@class="vcard-names"]/span)[1]').text
            )
```

Success!

The last 2 test cases follow the same set of rules. Find the xpath selector, assert some condition. I will fill in the details how to parse a url and find the About text in the body of the page .

Lets see the final result, with cleaned up comments...

``` python
# blog_test.py
# blog_test.py
import time
import unittest

from selenium import webdriver


class BlogTesting(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http://www.simpleselenium.com')

    def test_post_navigation(self):
        # Get the name of the first post
        first_post = self.driver.find_element_by_xpath('(//div[@data="post"]//h3)[1]')
        first_post_name = first_post.text

        # click on the first post
        first_post.click()
        time.sleep(3)  # wait for page to load

        # verify that the post title matches the name saved from step 3
        current_post = self.driver.find_element_by_xpath('//div[@data="post"]/h1')
        current_post_name = current_post.text

        # assert that the post name matches the name of the first post on the posts page
        self.assertEquals(
            first_post_name,
            current_post_name,
            'Expected the name of the post to be {}, instead was {}'.format(
                first_post_name,
                current_post_name
            )
        )

    def test_navigation_links_work(self):
        # get the navigation link names
        navigation_items = self.driver.find_elements_by_xpath('//ul[@data-testid="navigation"]/a')

        # verify navigation names are ['Home', 'About', 'GitHub']
        expected_link_names = {'Home', 'About', 'GitHub'}
        navigation_links_names = set([link.text for link in navigation_items])
        self.assertEquals(expected_link_names, navigation_links_names)

        # navigate to each navigation link and verify they're on the right page
        navigation_links = {link.text: link.get_attribute("href") for link in navigation_items}
        for link_text, url in navigation_links.items():
            self.driver.get(url)
            time.sleep(3)
            if link_text == 'Home':
                self.assertEquals('www.simpleselenium.com', url)
            elif link_text == 'About':
                page_heading_text = self.driver.find_element_by_xpath('//div/h1[contains(text(), "About")]').text
                self.assertTrue('About' in page_heading_text)
            elif link_text == 'GitHub':
                self.assertEquals(
                    'David Munro',
                    self.driver.find_element_by_xpath('(//h1[@class="vcard-names"]/span)[1]').text
                )

    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()
```

# Conclusion
We've now built 2 fully functioning test cases using the unittest test framework. Though there were some things bothering me in this example (hard time.sleep(), etc) the overall implementation went smoothly.

In the next article I want to address **how to wait dynamically, instead of relying on the fragile, hated time.sleep() that we're currently using.**