from cmath import exp
from selenium import webdriver
from selenium.common import TimeoutException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import urllib.request
import pandas as pd
import time

import re


def remove_html(sentence):
    sentence = re.sub('(<([^>]+)>)|\n|\t|&nbsp;|&amp;|&gt;', '', sentence)
    return sentence


# 'bookwave_crawling_test.csv' 파일 읽기
df = pd.read_csv('data/crawling_data_1.csv', encoding='utf-8')

options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
# options.add_argument("headless")
driver = webdriver.Chrome(options=options)

# 새로운 데이터프레임 생성
final_df = pd.DataFrame(columns=['isbn', 'review'])
bookwave_book = pd.DataFrame(columns=['id', 'isbn', 'title','author','publisher','image_url','content','publish_date','genre_detail_dict_id'])

for index, row in df.iterrows():
    isbn = row['isbn']
    url = f"https://www.yes24.com/Product/Search?domain=BOOK&query={isbn}"
    driver.get(url)
    print(f"현재 idx는 {index} 입니다!!!!!!!")
    # review_list = []
    print(isbn)
    try:
        WebDriverWait(driver, 2).until(EC.element_to_be_clickable(
            (By.XPATH, f'//*[@id="yesSchList"]/li/div/div[1]/div[1]/span[1]/span[1]/a[1]'))).click()
        try:
            alert = WebDriverWait(driver, 2).until(EC.alert_is_present())
            alert.accept()
            continue  # 알림창이 뜨면 다시 for 문으로 돌아감
        except TimeoutException:
            pass  # 알림 창이 없으면 pass
    except:
        continue
    class_name5 = "gd_titArea"
    class_name = "gd_pubArea"
    class_name2 = "gd_auth"
    class_name3 = "gd_pub"
    class_name4 = "gd_date"
    try:
        #제목 크롤링 로직
        title_html = WebDriverWait(driver, 1).until(EC.visibility_of_element_located(
            (By.XPATH, f'//*[@id="yDetailTopWrap"]/div[2]/div[1]/div[@class="{class_name5}"]/h2'))).get_attribute(
            "innerHTML")
        title = remove_html(title_html)
        print(title)
    except Exception:
        continue


    # 작가 크롤링 로직
    # author_html = WebDriverWait(driver, 2).until(EC.visibility_of_element_located(
    #     (By.XPATH, f'//*[@id="yDetailTopWrap"]/div[2]/div[1]/span[@class="{class_name}"]/span/a'))).get_attribute(
    #     "innerHTML")
    # author = remove_html(author_html)
    # print(author)
    try:
    # 첫 번째 경로에서 텍스트 가져오기 시도
        author_html = WebDriverWait(driver, 1).until(EC.visibility_of_element_located(
            (By.XPATH, f'//*[@id="yDetailTopWrap"]/div[2]/div[1]/span[@class="{class_name}"]/span[@class="{class_name2}"]/a'))).get_attribute("innerHTML")
    except Exception as e1:
        try:
        # 첫 번째 경로에서 실패한 경우, 두 번째 경로에서 텍스트 가져오기 시도
            author_html = WebDriverWait(driver, 1).until(EC.visibility_of_element_located(
                (By.XPATH, f'//*[@id="yDetailTopWrap"]/div[2]/div[1]/span[@class="{class_name}"]/span[@class="{class_name2}"]'))).get_attribute("innerHTML")
            print("나 발동돼")
        except Exception as e2:
        # 여기서도 실패한 경우 오류 처리
            print("Failed to get the text from both XPaths")
            author_html = None

    author = remove_html(author_html)
    print(author)
    # 출판사 크롤링 로직
    try:
        publisher_html = WebDriverWait(driver, 1).until(EC.visibility_of_element_located(
            (By.XPATH, f'//*[@id="yDetailTopWrap"]/div[2]/div[1]/span[@class="{class_name}"]/span[@class="{class_name3}"]'))).get_attribute(
            "innerHTML")
        publisher = remove_html(publisher_html)
        print(publisher)
    except Exception:
        continue
    # # 발행일자 크롤링 로직
    try:
        publisher_day_html =WebDriverWait(driver, 1).until(EC.visibility_of_element_located(
            (By.XPATH, f'//*[@id="yDetailTopWrap"]/div[2]/div[1]/span[@class="{class_name}"]/span[@class="{class_name4}"]'))).get_attribute(
            "innerHTML")
        publisher_day = remove_html(publisher_day_html)
        match = re.search(r"(\d+)년 (\d+)월 (\d+)일", publisher_day)
        if match:
            formatted_date = "-".join(match.groups())
        print(formatted_date)
    except Exception:
        continue
    time.sleep(1)

    book_df2 = pd.DataFrame({'isbn': [isbn], 'title': title,'author':author,'publisher':publisher,'image_url':row['image_url'],'content':row['content'],'publish_date':formatted_date,'genre_detail_dict_id':row['genre_detail_dict_id']})
    bookwave_book=pd.concat([bookwave_book, book_df2], ignore_index=True)

    for i in range(2, 7):
        try:
            element_id = "infoset_reviewContentList"
            scroll_script = f"document.getElementById('{element_id}').scrollIntoView();"
            driver.execute_script(scroll_script)
            time.sleep(2)

            WebDriverWait(driver, 1).until(EC.element_to_be_clickable(
                (By.XPATH, f'//*[@id="infoset_reviewContentList"]/div[{i}]/div[2]/a/div/span'))).click()
            time.sleep(1)
            review = WebDriverWait(driver, 1).until(EC.visibility_of_element_located(
                (By.XPATH, f'//*[@id="infoset_reviewContentList"]/div[{i}]/div[3]/div[2]'))).get_attribute(
                "innerHTML")
            time.sleep(1)
            sentence = remove_html(review)
            # review_list.append(sentence)
            # print(sentence)
            if not sentence:
                break

            print(sentence)
                # 데이터프레임으로 추가
            book_df = pd.DataFrame({'isbn': [isbn], 'review': sentence})
            final_df = pd.concat([final_df, book_df], ignore_index=True)


        except Exception as e:

            # print("에러 발생:", e)

            continue



# 최종 CSV 파일로 저장

# 'id' 열 추가
bookwave_book['id'] = range(1, len(bookwave_book) + 1)
final_df.to_csv('review/bookwave_reviews_1.csv', index=False, encoding='utf-8-sig')
bookwave_book.to_csv('booktable/bookwave_book_table_1.csv', index=False, encoding='utf-8-sig')