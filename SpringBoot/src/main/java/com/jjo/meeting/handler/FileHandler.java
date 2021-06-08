package com.jjo.meeting.handler;

import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Component
public class FileHandler {

    public StringBuffer saveFile(Long meetingId, List<MultipartFile> files) throws Exception {
        StringBuffer fileList = new StringBuffer();

        //빈 파일 처리
        if(files.isEmpty()) {
            return fileList;
        }

        // 프로젝트 폴더에 저장하기 위해 절대경로를 설정 (Window 의 Tomcat 은 Temp 파일을 이용한다)
        String absolutePath = "/Users/jjo/Desktop/MeYou/";
        String p = new File("").getAbsolutePath() + "/";
        System.out.println(p);

        int index = 1;
        String sub_path = "meeting/" + meetingId;
        String path = absolutePath + sub_path;
        File file = new File(path);

        if(!file.exists()) {
            file.mkdirs();
        }

        for (MultipartFile multipartFile : files) {
            if(!multipartFile.isEmpty()) {
                String contentType = multipartFile.getContentType();
                String originalFileExtension;
                // 확장자 명이 없으면 이 파일은 잘 못 된 것이다
                if (ObjectUtils.isEmpty(contentType)){
                    break;
                }
                else{
                    if(contentType.contains("image/jpeg")){
                        originalFileExtension = ".jpg";
                    }
                    else if(contentType.contains("image/png")){
                        originalFileExtension = ".png";
                    }
                    else if(contentType.contains("image/gif")){
                        originalFileExtension = ".gif";
                    }
                    // 다른 파일 명이면 아무 일 하지 않는다
                    else{
                        break;
                    }
                }
                String new_file_name = index + originalFileExtension;
                file = new File(path + "/" + new_file_name);
                System.out.println(file.getAbsolutePath());
                multipartFile.transferTo(file);
                fileList.append(sub_path + "/" + new_file_name +":");
                index++;
            }
        }

        return fileList;
    }

    public StringBuffer saveProfileImgFile(Long memberID, List<MultipartFile> files) throws Exception {
        StringBuffer fileList = new StringBuffer();

        //빈 파일 처리
        if(files.isEmpty()) {
            return fileList;
        }

        // 프로젝트 폴더에 저장하기 위해 절대경로를 설정 (Window 의 Tomcat 은 Temp 파일을 이용한다)
        String absolutePath = "/Users/jjo/Desktop/MeYou/";
        String p = new File("").getAbsolutePath() + "/";
        System.out.println(p);

        int index = 1;
        String sub_path = "profile/" + memberID;
        String path = absolutePath + sub_path;
        File file = new File(path);

        if(!file.exists()) {
            file.mkdirs();
        }

        for (MultipartFile multipartFile : files) {
            if(!multipartFile.isEmpty()) {
                String contentType = multipartFile.getContentType();
                String originalFileExtension;
                // 확장자 명이 없으면 이 파일은 잘 못 된 것이다
                if (ObjectUtils.isEmpty(contentType)){
                    break;
                }
                else{
                    if(contentType.contains("image/jpeg")){
                        originalFileExtension = ".jpg";
                    }
                    else if(contentType.contains("image/png")){
                        originalFileExtension = ".png";
                    }
                    else if(contentType.contains("image/gif")){
                        originalFileExtension = ".gif";
                    }
                    // 다른 파일 명이면 아무 일 하지 않는다
                    else{
                        break;
                    }
                }
                String new_file_name = index + originalFileExtension;
                file = new File(path + "/" + new_file_name);
                System.out.println(file.getAbsolutePath());
                multipartFile.transferTo(file);
                fileList.append(sub_path + "/" + new_file_name +":");
                index++;
            }
        }

        return fileList;
    }
}
