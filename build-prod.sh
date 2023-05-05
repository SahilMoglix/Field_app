cd src/services && 
sed -i'' -e 's/BASE_URL: QA/BASE_URL: PROD/g' constant.js && 
rm constant.js-e  && 
cd ../.. && 
npx react-native run-android